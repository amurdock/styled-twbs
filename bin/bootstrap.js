const path = require('path');
const util = require('util');
const AST = require('./ast');
const processor = require('./processor');

const parse = (file, cwd = process.cwd()) => util.promisify(AST.parse)({ cwd, file });

(async () => {
  const [ dir ] = require.resolve('bootstrap').match(/.+\/node_modules\/\w+(?=\/)/);
  const { sass } = require(path.join(dir, 'package.json'));
  const file = path.join(dir, sass);

  const { ast: node, ...ctx } = await parse(file);

  // set the contexts root node
  ctx.root = node;

  const { root: { modules } } = processor(node, ctx);
  // modules.forEach(({ uri, output }) => console.log(uri, '=>', output));
})();
