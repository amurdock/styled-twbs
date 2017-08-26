module.exports = (node, parent, processor) => {
  if (node !== parent.root) {
    parent.modules = parent.modules ? [ ...parent.modules, node ] : [ node ];
  }

  // if (node.uri === 'buttons') {
  //   console.log(JSON.stringify(node, null, 2));
  // }

  console.log(node.uri);

  node.content.forEach(child => processor(child, node));

  return { ...parent };
};
