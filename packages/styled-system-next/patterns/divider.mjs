import { getPatternStyles, patternFns } from '../helpers.mjs';
import { css } from '../css/index.mjs';

const dividerConfig = {
transform(props, { map }) {
  const { orientation, thickness, color, ...rest } = props;
  return {
    "--thickness": thickness,
    width: map(orientation, (v) => v === "vertical" ? void 0 : "100%"),
    height: map(orientation, (v) => v === "horizontal" ? void 0 : "100%"),
    borderBlockEndWidth: map(orientation, (v) => v === "horizontal" ? "var(--thickness)" : void 0),
    borderInlineEndWidth: map(orientation, (v) => v === "vertical" ? "var(--thickness)" : void 0),
    borderColor: color,
    ...rest
  };
},
defaultValues:{orientation:'horizontal',thickness:'1px'}}

export const getDividerStyle = (styles = {}) => {
  const _styles = getPatternStyles(dividerConfig, styles)
  return dividerConfig.transform(_styles, patternFns)
}

export const divider = (styles) => css(getDividerStyle(styles))
divider.raw = getDividerStyle