const fs = require('fs');
const path = require('path');
const util = require('util');
const AST = require('./ast');
const builders = require('./builders');
const templates = require('./templates');

const readdir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);

const parse = (file, cwd = process.cwd()) => new Promise((resolve, reject) =>
  AST.parse({cwd, file}, (err, result) => err ? reject(err) : resolve(result.ast)));

const save = mod => content => writeFile(path.join('src', `${mod}.js`), content);

(async () => {
  const [ root ] = require.resolve('bootstrap').match(/.+\/node_modules\/\w+(?=\/)/);

  const src = path.join(root, 'scss');
  const contents = await readdir(src);
  const modules = contents.filter(content => content.startsWith('_'));
  const key = index => path.basename(modules[index], '.scss').substring(1);
  const asts = await Promise.all(modules.map(mod => parse(path.join(src, mod))));
  const astMap = asts.reduce((map, ast, index) => ({ ...map, [key(index)]: ast }), {});

  await Promise.all(Object.keys(builders).map(name => builders[name](astMap, templates, save(name))));
})();
