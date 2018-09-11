import { reduce } from 'lodash/fp';
import getPropTypesStatement from '../util/getPropTypesStatement';
import getSheet from '../util/getSheet';
import createTypeAnnotation from '../util/createTypeAnnotation';
import { isIdentifier } from '../util/typeHelpers';
import { getPropTypesObject, removePropTypesVariableDeclaration } from '../util/propTypesObject';

const buildFunctionInfo = (name, funcNode, path) => ({ name, funcNode, path });

const getFunctionDeclarations = (j, ast) =>
  ast
    .find(j.FunctionDeclaration)
    .paths()
    .map(path => buildFunctionInfo(path.node.id.name, path.node, path));

const getFunctionExpressions = (j, ast) =>
  ast
    .find(j.VariableDeclarator, {
      init: {
        type: 'FunctionExpression',
      },
    })
    .paths()
    .map(path => buildFunctionInfo(path.node.id.name, path.node.init, path.parent));

const getArrowFunctions = (j, ast) =>
  ast
    .find(j.VariableDeclarator, {
      init: {
        type: 'ArrowFunctionExpression',
      },
    })
    .paths()
    .map(path => buildFunctionInfo(path.node.id.name, path.node.init, path.parent));

const getPotentialFunctionalComponents = (j, ast) =>
  [
    ...getFunctionDeclarations(j, ast),
    ...getFunctionExpressions(j, ast),
    ...getArrowFunctions(j, ast),
  ];

/* eslint no-param-reassign: 0 */
export const addTypeAnnotationToFunction = (j, funcNode, typeAliasName) => {
  if (!funcNode.params.length) {
    return;
  }

  const typeAnnotation = j.typeAnnotation(j.genericTypeAnnotation(
    j.identifier(typeAliasName),
    null,
  ));
  const props = funcNode.params[0];

  if (isIdentifier(props)) {
    props.typeAnnotation = typeAnnotation;
  } else {
    // applying props.typeAnnotation doesn't seem to work for ObjectPattern
    // to workarround this we need to do some hacky string replacements to
    // cover this case. See propsToFlow.js file
  }
};

const checkExistingPropsType = ({ params }) =>
  params.length && params[0].typeAnnotation;

const hasChildren = params =>
  params[0].type === 'ObjectPattern' && params[0].properties.some(({ key }) => key.name === 'children');

export default (j, ast, options) => {
  const potentialFunctionalComponents = getPotentialFunctionalComponents(j, ast);
  const typeAliases = reduce((types, { name, funcNode, path }) => {
    const propTypesStatement = getPropTypesStatement(j, ast, name);
    if (!propTypesStatement.length) {
      return types;
    }

    const sheet = getSheet(j, ast, name);

    const propTypesObject = getPropTypesObject(
      j,
      ast,
      propTypesStatement,
      options,
    );
    if (options['remove-prop-types']) {
      removePropTypesVariableDeclaration(j, ast, propTypesStatement);
      propTypesStatement.remove();
    }
    if (checkExistingPropsType(funcNode)) {
      return types;
    }

    const typeAnnotation = createTypeAnnotation(
      j,
      propTypesObject,
      ast,
      name,
      funcNode,
      path,
      sheet,
      hasChildren(funcNode.params),
    );

    return [...types, typeAnnotation];
  }, [], potentialFunctionalComponents);

  return typeAliases;
};
