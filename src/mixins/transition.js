import { enableTransitions, transitionBase } from '../variables';

export const mixinTransition = (...args) => enableTransitions ? `
  transition: ${args.length ? args.join(' ')  : transitionBase}
` : '';
