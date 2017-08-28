import Color from 'color';

export const toRGB = color => Color(color).rgb().array().join(',');
