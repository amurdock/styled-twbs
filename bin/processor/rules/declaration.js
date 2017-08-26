const camelCase = require('camel-case');

const mapByTypes = (parent, ...types) => {
  let data = {};

  parent.traverseByTypes(types, node => {
    data = {
      [node.type]: node,
      ...data,
    };
  });

  return data;
};

const normalizeVariable = ({variable: {content: [{content}]}, value}) => {
  let {type: parentType, content: [val]} = value;
  const {type} = val;
  const name = camelCase(content);

  switch (`${parentType}-${type}`) {
    case 'value-color':
      val = val.toString();
      break;
    case 'value-variable':
      val = `$${camelCase(val.toString().substring(1))}`;
      break;
    case 'value-ident':
    case 'value-dimension':
    case 'value-number':
    case 'value-percentage':
    case 'value-string':
      val = value.content[0].toString();
      break;
    case 'value-parentheses':
    case 'value-function':
      val = null;
      break;
    default:
      val = null;
      break;
  }

  return {
    name,
    type,
    val
  };
};

module.exports = (node, ctx) => {
  const variables = ctx.output = ctx.output || {};
  const { name, val } = normalizeVariable(mapByTypes(node, 'variable', 'value'));

  variables[name] = val;

  return { ...ctx };
};
