export default (j, ast, name) =>
  ast.find(j.CallExpression, {
    callee: {
      type: 'CallExpression',
      callee: {
        type: 'Identifier',
        name: 'useSheet',
      },
    },
    arguments: [{
      type: 'Identifier',
      name,
    }],
  }).size() > 0;
