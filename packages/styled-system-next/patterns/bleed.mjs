import { getPatternStyles, patternFns } from '../helpers.mjs';
import { css } from '../css/index.mjs';

const bleedConfig = {
transform(props, { map, isCssUnit, isCssVar }) {
  const { inline, block, ...rest } = props;
  const valueFn = (v) => isCssUnit(v) || isCssVar(v) ? v : `token(spacing.${v}, ${v})`;
  return {
    "--bleed-x": map(inline, valueFn),
    "--bleed-y": map(block, valueFn),
    marginInline: "calc(var(--bleed-x, 0) * -1)",
    marginBlock: "calc(var(--bleed-y, 0) * -1)",
    ...rest
  };
},
defaultValues:{inline:'0',block:'0'}}

export const getBleedStyle = (styles = {}) => {
  const _styles = getPatternStyles(bleedConfig, styles)
  return bleedConfig.transform(_styles, patternFns)
}

export const bleed = (styles) => css(getBleedStyle(styles))
bleed.raw = getBleedStyle