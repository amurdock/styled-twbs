const rules = require('./rules');

const processor = module.exports = (node, ctx) => {
  const rule = rules[node.type];
  if (!rule) {
    // console.log('<<', node.type);
    return;
  }

  return rule(node, ctx, processor);
};
