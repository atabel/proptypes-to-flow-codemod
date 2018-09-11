// export default (j, ast, name) =>
//   ast.find(j.CallExpression, {
//     callee: {
//       type: 'CallExpression',
//       callee: {
//         type: 'Identifier',
//         name: 'useSheet',
//       },
//     },
//     arguments: [{
//       type: 'Identifier',
//       name,
//     }],
//   }).size() > 0;

export default (j, ast, name) => {
  const sheets = ast.find(j.CallExpression, {
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
  });
  if (sheets.size() > 0) {
    return sheets.nodes()[0].callee.arguments[0].name;
  } else {
    return null;
  }
};
