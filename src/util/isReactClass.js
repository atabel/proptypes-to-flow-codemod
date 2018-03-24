import { isMemberExpression, isIdentifier } from './typeHelpers';

const isObjectReact = (objectProp) =>
  isIdentifier(objectProp) && objectProp.name === 'React';

const isIdentifierReactComponent = (classNode) =>
  isIdentifier(classNode) && (classNode.name === 'Component' || classNode.name === 'PureComponent');

const isMemberExpressionReact = (classNode) =>
  isMemberExpression(classNode) &&
  isObjectReact(classNode.object) && isIdentifierReactComponent(classNode.property);

export default (classNode) =>
  isIdentifierReactComponent(classNode) || isMemberExpressionReact(classNode);
