import { enableShadows } from '../variables';

export const mixinBoxShadow = (...args) => enableShadows ? `
  box-shadow: ${args.join(' ')};
` : '';
