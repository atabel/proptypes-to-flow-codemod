import { get } from 'lodash';
import isReactClass from '../util/isReactClass';
import createTypeAnnotation from '../util/createTypeAnnotation';
import getPropTypesStatement from '../util/getPropTypesStatement';
import { getPropTypesObject, removePropTypesVariableDeclaration } from '../util/propTypesObject';

const createPropsTypeAnnotation = (j, typeAliasName) =>
  j.genericTypeAnnotation(j.identifier(typeAliasName), null);

const createSuperTypeParameters = (j, typeParameteres, typeAliasName) => {
  if (typeParameteres) {
    const firstTypeParam = get(typeParameteres, 'params[0]');
    if (firstTypeParam && firstTypeParam.id.name === typeAliasName) {
      return typeParameteres;
    }

    const propsTypeAnnotation = createPropsTypeAnnotation(j, typeAliasName);
    return { ...typeParameteres, params: [propsTypeAnnotation, ...typeParameteres.params] };
  }
  return j.typeParameterInstantiation([createPropsTypeAnnotation(j, typeAliasName)]);
};

/* eslint no-param-reassign: 0 */
export const addTypeAnnotationToClass = (j, node, typeAliasName) => {
  node.superTypeParameters = createSuperTypeParameters(
    j,
    node.superTypeParameters,
    typeAliasName,
  );
};

const getStaticPropTypes = (j, path) =>
  j(path).find(j.ClassProperty, {
    key: {
      type: 'Identifier',
      name: 'propTypes',
    },
  });

const checkExistintgPropsType = ({ superTypeParameters }) =>
  superTypeParameters && superTypeParameters.params.length;

export default (j, ast, options) => {
  const classComponents = ast
    .find(j.ClassDeclaration)
    .filter(({ node }) => (
      node.superClass &&
      isReactClass(node.superClass)
    ));

  const typeAliases = [];

  if (!classComponents.length) {
    return typeAliases;
  }

  classComponents.forEach((path) => {
    const { node } = path;
    const staticPropTypes = getStaticPropTypes(j, path);
    const propTypesStatement = getPropTypesStatement(j, ast, node.id.name);

    if (!staticPropTypes.length && !propTypesStatement.length) {
      return;
    }

    const propTypes = staticPropTypes.length ? staticPropTypes : propTypesStatement;
    const propTypesObject = getPropTypesObject(j, ast, propTypes, options);

    if (options['remove-prop-types']) {
      removePropTypesVariableDeclaration(j, ast, propTypes);
      propTypes.remove();
    }

    if (checkExistintgPropsType(node)) {
      return;
    }
    typeAliases.push(createTypeAnnotation(j, propTypesObject, ast, node.id.name, node, path));
  });

  return typeAliases;
};
