import styled from 'styled-components';
import * as vars from './variables';

import {
  mixinButtonSize,
  mixinTransition,
  mixinHoverFocus,
  mixinBoxShadow,
  mixinButtonVariant,
  mixinButtonOutlineVariant
} from './mixins';

const attributes = [
  'primary',
  'secondary',
  'info',
  'success',
  'warning',
  'danger'
];

const alternateButton = props => {
  const index = attributes.findIndex(attribute => !!props[`btn-${attribute}`]);
  if (index === -1) {
    return null;
  }

  const attribute = `${attributes[index].charAt(0).toUpperCase()}${attributes[index].slice(1)}`;

  return mixinButtonVariant(vars[`btn${attribute}Color`], vars[`btn${attribute}Bg`],vars[`btn${attribute}Border`]);
};

const outlineButton = props => {
  const index = attributes.findIndex(attribute => !!props[`btn-outline-${attribute}`]);
  if (index === -1) {
    return null;
  }

  const attribute = `${attributes[index].charAt(0).toUpperCase()}${attributes[index].slice(1)}`;

  return mixinButtonOutlineVariant(vars[`btn${attribute}Bg`]);
};

export const Button = (tagName = 'button') => styled(tagName)`
  display: inline-block;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  
  ${mixinButtonSize(vars.btnPaddingY, vars.btnPaddingX, vars.fontSizeBase, vars.btnBorderRadius)}
  ${mixinTransition(vars.btnTransition)}
  
  // Share hover and focus styles
  ${ mixinHoverFocus`
    text-decoration: none;
  ` }

  &:focus,
  &.focus {
    outline: 0;
    box-shadow: ${vars.btnFocusBoxShadow};
  }
  
  // Disabled comes first so active can properly restyle
  &.disabled,
  &:disabled {
    cursor: $cursor-disabled;
    opacity: .65;
    ${mixinBoxShadow('none')}
  }
  
  &:active,
  &.active {
    background-image: none;
    ${mixinBoxShadow(vars.btnFocusBoxShadow, vars.btnActiveBoxShadow)}
  }
  
  ${alternateButton}
  ${outlineButton}
`;

export const ButtonPrimary = tagName => Button(tagName).extend`
  ${mixinButtonVariant(vars.btnPrimaryColor, vars.btnPrimaryBg, vars.btnPrimaryBorder)}
`;

export const ButtonSecondary = tagName => Button(tagName).extend`
  ${mixinButtonVariant(vars.btnSecondaryColor, vars.btnSecondaryBg, vars.btnSecondaryBorder)}
`;

export const ButtonInfo = tagName => Button(tagName).extend`
  ${mixinButtonVariant(vars.btnInfoColor, vars.btnInfoBg, vars.btnInfoBorder)}
`;

export const ButtonSuccess = tagName => Button(tagName).extend`
  ${mixinButtonVariant(vars.btnSuccessColor, vars.btnSuccessBg, vars.btnSuccessBorder)}
`;

export const ButtonWarning = tagName => Button(tagName).extend`
  ${mixinButtonVariant(vars.btnWarningColor, vars.btnWarningBg, vars.btnWarningBorder)}
`;

export const ButtonDanger = tagName => Button(tagName).extend`
  ${mixinButtonVariant(vars.btnDangerColor, vars.btnDangerBg, vars.btnDangerBorder)}
`;
