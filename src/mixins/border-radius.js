import { borderRadius, enableRounded } from '../variables';

export const mixinBorderRadius = (radius = borderRadius) => enableRounded ? `
  border-radius: ${radius};
` : '';
