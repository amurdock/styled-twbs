import Color from 'color';

import { mixinBoxShadow } from './box-shadow';
import { mixinBorderRadius } from './border-radius';
import { toRGB } from '../utils';

import {
  btnBoxShadow,
  enableShadows,
  btnActiveBoxShadow
} from '../variables';

const boxShadow = border => enableShadows ?
  `${btnBoxShadow}, 0 0 0 2px rgba(${toRGB(border)}, .5)'` :
  `0 0 0 2px rgba(${toRGB(border)}, .5)`;

export const mixinButtonVariant = (color, background, border) => {
  const activeBackground = Color(background).darken(0.1).hex();
  const activeBorder = Color(border).darken(0.12).hex();

  return `
    color: ${color};
    background-color: ${background};
    border-color: ${border};
    ${mixinBoxShadow(btnBoxShadow)}
    
    &:hover {
      color: ${color};
      background-color: ${activeBackground};
      border-color: ${activeBorder};
    }
    
    &:focus,
    &.focus {
      // Avoid using mixin so we can pass custom focus shadow properly
      box-shadow: ${boxShadow(border)};
    }
    
    // Disabled comes first so active can properly restyle
    &.disabled,
    &:disabled {
      background-color: ${background};
      border-color: ${border};
    }
    
    &:active,
    &.active,
    .show > &.dropdown-toggle {
      color: ${color};
      background-color: ${activeBackground};
      background-image: none; // Remove the gradient for the pressed/active state
      border-color: ${activeBorder};
      ${mixinBoxShadow(btnActiveBoxShadow)}
    }
  `;
};

export const mixinButtonOutlineVariant = (color, colorHover = '#fff') => `
  color: ${color};
  background-image: none;
  background-color: transparent;
  border-color: ${color};

  &:hover {
    color: ${colorHover};
    background-color: ${color};
    border-color: ${color};
  }

  &:focus,
  &.focus {
    box-shadow: 0 0 0 2px rgba(${toRGB(color)}, .5);
  }

  &.disabled,
  &:disabled {
    color: ${color};
    background-color: transparent;
  }

  &:active,
  &.active,
  .show > &.dropdown-toggle {
    color: ${colorHover};
    background-color: ${color};
    border-color: ${color};
  }
`;

export const mixinButtonSize = (paddingY, paddingX, fontSize, borderRadius) => `
  padding: ${paddingY} ${paddingX};
  font-size: ${fontSize};
  ${mixinBorderRadius(borderRadius)}
`;
