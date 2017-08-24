const stringify = require('javascript-stringify');

module.exports = content => `export default ${stringify(content, null, 2)};`;
