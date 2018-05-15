import { map, flow, some, isNull, negate } from 'lodash/fp';
import flowTypes from '../constants/flowTypes';
import { isMemberExpression, isLiteral } from './typeHelpers';

const createAnyTypeAnnotation = j => j.anyTypeAnnotation();

const createArrayAnnotation = (j, typeOfArrayAnnotation) => {
  const typeOfArray = typeOfArrayAnnotation || createAnyTypeAnnotation(j);
  return j.arrayTypeAnnotation(typeOfArray);
};

const createPrimitiveAnnotation = primitiveType => j => j[`${primitiveType}TypeAnnotation`]();

const createGenericTypeAnnotation = type => j => j.genericTypeAnnotation(j.identifier(type), null);

const createReactTypeAnnotation = (type, params = () => null) => j =>
  j.genericTypeAnnotation(
    j.qualifiedTypeIdentifier(j.identifier('React'), j.identifier(type)),
    params(j),
  );

const createObjectAnnotation = (j, objectShape) => {
  if (!objectShape) {
    return j.objectTypeAnnotation([]);
  }

  const flowObjectProperties = createFlowObjectProperties(
    j,
    getObjectPropertiesFlowTypes(j, objectShape, true),
  );
  return j.objectTypeAnnotation(flowObjectProperties);
};

const createUnionByTypeAnnotation = (j, values) =>
  flow(map(element => createTypeAnnotation(j, element)), j.unionTypeAnnotation)(values.elements);

const createUnionByValueAnnotation = (j, values) => {
  if (some(negate(isLiteral), values.elements)) {
    return createAnyTypeAnnotation(j);
  }
  return flow(
    map(element => {
      const literalType = !isNull(element.value) ? typeof element.value : element.value;
      return j[`${literalType}LiteralTypeAnnotation`](element.value, element.raw);
    }),
    j.unionTypeAnnotation,
  )(values.elements);
};

const typesMap = {
  array: createArrayAnnotation,
  arrayOf: createArrayAnnotation,
  bool: createPrimitiveAnnotation(flowTypes.boolean),
  func: createGenericTypeAnnotation('Function'),
  number: createPrimitiveAnnotation(flowTypes.number),
  object: createObjectAnnotation,
  string: createPrimitiveAnnotation(flowTypes.string),
  objectOf: createObjectAnnotation,
  shape: createObjectAnnotation,
  oneOf: createUnionByValueAnnotation,
  oneOfType: createUnionByTypeAnnotation,
  node: createReactTypeAnnotation('Node'),
  element: createReactTypeAnnotation('Element', j => j.typeParameterInstantiation([j.existsTypeAnnotation()])),
  any: createAnyTypeAnnotation,
};

const parseMemberExpression = propType => [propType.property.name, null];

const parseCallExpression = propType => [
  propType.callee.property.name,
  propType.arguments.length ? propType.arguments[0] : null,
];

const parseUnknown = () => ['any', null];

const parsersMap = {
  CallExpression: parseCallExpression,
  MemberExpression: parseMemberExpression,
};

const typesOfValuesSet = new Set(['ObjectExpression', 'ArrayExpression']);

const createTypeAnnotation = (j, propType) => {
  const parser = parsersMap[propType.type] || parseUnknown;
  const parsedPropType = parser(propType);
  const [typeName, nestedPropType] = parsedPropType;
  const flowTypeCreator = typesMap[typeName] || typesMap.any;
  if (nestedPropType && !typesOfValuesSet.has(nestedPropType.type)) {
    return flowTypeCreator(j, createTypeAnnotation(j, nestedPropType));
  }
  return flowTypeCreator(j, nestedPropType);
};

const createFlowObjectProperties = (j, types) =>
  map(type => j.objectTypeProperty(type.name, type.type, !type.required), types);

const getObjectPropertiesFlowTypes = (j, objectNode, alwaysRequired) =>
  map(({ key, value }) => {
    let propType = value;
    let required = false;
    if (isMemberExpression(value) && value.property.name === 'isRequired') {
      propType = value.object;
      required = true;
    }
    return {
      name: key,
      type: createTypeAnnotation(j, propType),
      required: alwaysRequired || required,
    };
  }, objectNode.properties);

export default (
  j,
  propTypesObjectNode,
  ast,
  componentName,
  node,
  path,
  hasSheet,
  hasChildren = false,
) => {
  const types = propTypesObjectNode ? getObjectPropertiesFlowTypes(j, propTypesObjectNode) : [];
  if (hasSheet) {
    types.push({
      name: j.identifier('classes'),
      type: j.existsTypeAnnotation(),
      required: true,
    });
  }

  if (hasChildren && !types.some(({ name }) => name.name === 'children')) {
    types.push({
      name: j.identifier('children'),
      type: createReactTypeAnnotation('Node')(j),
      required: true,
    });
  }

  return {
    componentName,
    node,
    path,
    flowPropTypes: j.objectTypeAnnotation(createFlowObjectProperties(j, types)),
  };
};
