import { getPatternStyles, patternFns } from '../helpers.mjs';
import { css } from '../css/index.mjs';

const spacerConfig = {
transform(props, { map, isCssUnit, isCssVar }) {
  const { size, ...rest } = props;
  return {
    alignSelf: "stretch",
    justifySelf: "stretch",
    flex: map(size, (v) => {
      if (v == null) return "1";
      const val = isCssUnit(v) || isCssVar(v) ? v : `token(spacing.${v}, ${v})`;
      return `0 0 ${val}`;
    }),
    ...rest
  };
}}

export const getSpacerStyle = (styles = {}) => {
  const _styles = getPatternStyles(spacerConfig, styles)
  return spacerConfig.transform(_styles, patternFns)
}

export const spacer = (styles) => css(getSpacerStyle(styles))
spacer.raw = getSpacerStyle