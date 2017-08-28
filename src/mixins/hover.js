import { css } from 'styled-components';

import { enableHoverMediaQuery } from '../variables';

export const mixinHover = (...args) => `&:hover {
  ${css(...args)}
}`;

export const mixinHoverFocus = (...args) => enableHoverMediaQuery ? css`
  &:focus {
    ${css(...args)}
    ${mixinHover(...args)}
  }
` : css`
  &:focus,
  &:hover {
    ${css(...args)}
  }
`;
