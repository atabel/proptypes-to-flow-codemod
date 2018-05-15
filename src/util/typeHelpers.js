export const isMemberExpression = node => node.type === 'MemberExpression';

export const isLiteral = node => node.type === 'Literal';

export const isReactType = node => node.id.qualification && node.id.qualification.name === 'React';

export const isImportDeclaration = node => node.type === 'ImportDeclaration';

export const isImportDeclarationReact = node => node.source.value === 'react';

export const isIdentifier = node => node.type === 'Identifier';
