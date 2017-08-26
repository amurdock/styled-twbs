module.exports = (node, ctx) => {
  console.log('*** class ***', node.filename);
  return { ...ctx };
};
