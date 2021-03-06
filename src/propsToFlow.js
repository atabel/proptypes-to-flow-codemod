import 'babel-polyfill';

import { reduce, findIndex, find } from 'lodash/fp';
import handleClassPropTypes, { addTypeAnnotationToClass, inlineTypeAnnotationToClass } from './tranformers/handleClassPropTypes';
import handleFunctionPropTypes, { addTypeAnnotationToFunction } from './tranformers/handleFunctionPropTypes';
import { isReactType, isImportDeclaration, isImportDeclarationReact } from './util/typeHelpers';

const addFlowComment = (j, ast) => {
  ast.find(j.Program).forEach(path => {
    const { node } = path;
    const { body } = node;
    const firstNode = body.length ? body[0] : null;
    if (!firstNode) {
      return;
    }

    let { comments } = firstNode;
    comments = comments || [];
    firstNode.comments = comments;
    const existingFlowComment = find(
      comment => comment.value.trim() === '@flow',
      firstNode.comments,
    );

    if (existingFlowComment) {
      return;
    }

    comments.unshift(j.commentLine(' @flow'));
  });
};

const addTypeAliases = (j, typeAliases) => {
  typeAliases.forEach(({
    node, path, componentName, flowPropTypes,
  }) => {
    const typeAliasName = typeAliases.length > 1 ? `${componentName}Props` : 'Props';

    let inlineDeclaration = false;
    if (node.type === 'ClassDeclaration') {
      if (flowPropTypes.properties.length === 0) {
        inlineDeclaration = true;
        inlineTypeAnnotationToClass(j, node, flowPropTypes);
      } else {
        addTypeAnnotationToClass(j, node, typeAliasName);
      }
    } else {
      addTypeAnnotationToFunction(j, node, typeAliasName);
    }

    if (!inlineDeclaration) {
      j(path).replaceWith([
        j.typeAlias(j.identifier(typeAliasName), null, flowPropTypes),
        path.node,
      ]);
    }
  });
};

const getReactTypes = (j, typeAlias) => {
  const objectAnnotation = typeAlias.flowPropTypes;
  return reduce(
    (types, property) => {
      const genericTypes = j(property)
        .find(j.GenericTypeAnnotation)
        .nodes();
      if (!genericTypes.length) {
        return types;
      }
      const reactTypes = genericTypes
        .filter(genericTypeNode => isReactType(genericTypeNode))
        .map(genericTypeNode => genericTypeNode.id.name);
      return [...types, ...reactTypes];
    },
    [],
    objectAnnotation.properties,
  );
};

const getTypesToImport = j =>
  reduce((types, alias) => Array.from(new Set([...types, ...getReactTypes(j, alias)])), []);

const addTypeImport = (j, ast, typeAliases) => {
  const typesToImport = getTypesToImport(j)(typeAliases);
  if (typesToImport.length) {
    ast.find(j.Program).replaceWith(path => {
      const { node } = path;
      const indexOfReactImport = findIndex(
        element => isImportDeclaration(element) && isImportDeclarationReact(element),
        node.body,
      );

      if (indexOfReactImport !== -1) {
        // import * as React from 'react';
        node.body[indexOfReactImport].specifiers = [j.importNamespaceSpecifier(j.identifier('React'))];
      }

      return node;
    });
  }
};

const removePropTypesImport = (j, ast) => {
  ast
    .find(j.ImportDeclaration, {
      source: {
        value: 'prop-types',
      },
    })
    .remove();
};

export const parser = 'flow';

const transformer = (fileInfo, { jscodeshift: j }, options) => {
  const ast = j(fileInfo.source);

  const funcTypeAliases = handleFunctionPropTypes(j, ast, options);

  const typeAliases = [...handleClassPropTypes(j, ast, options), ...funcTypeAliases];
  addTypeAliases(j, typeAliases);
  addTypeImport(j, ast, typeAliases);

  if (options['remove-prop-types']) {
    removePropTypesImport(j, ast);
  }

  addFlowComment(j, ast);

  // we need to apply function params type annotations using string replacements
  // because jscodeshift doesn't seem to work when applying typeAnnotation to ObjectPattern
  const replacements = funcTypeAliases
    .filter(({ node }) => node.params[0].type !== 'Identifier') // typeAnnotation works with simple identifiers
    .map(({ node, componentName }) => {
      const typeAliasName = typeAliases.length > 1 ? `${componentName}Props` : 'Props';
      const from = j(node).toSource({
        lineTerminator: '\n',
        quote: 'single',
        trailingComma: true,
      });
      const paramsFrom = j(node.params).toSource({
        lineTerminator: '\n',
        quote: 'single',
        trailingComma: true,
      });
      const paramsTo = `${paramsFrom}: ${typeAliasName}`;
      const to = from.replace(paramsFrom, paramsTo);
      return [from, to];
    });

  const src = ast.toSource({
    lineTerminator: '\n',
    quote: 'single',
    trailingComma: true,
  });

  const output = replacements.reduce((outputSrc, [from, to]) => outputSrc.replace(from, to), src);
  return output;
};

export default transformer;
