import { getPatternStyles, patternFns } from '../helpers.mjs';
import { css } from '../css/index.mjs';

const floatConfig = {
transform(props, { map }) {
  const { offset, offsetX, offsetY, placement, ...rest } = props;
  return {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    insetBlockStart: map(placement, (v) => {
      const [side] = v.split("-");
      const map2 = { top: offsetY, middle: "50%", bottom: "auto" };
      return map2[side];
    }),
    insetBlockEnd: map(placement, (v) => {
      const [side] = v.split("-");
      const map2 = { top: "auto", middle: "50%", bottom: offsetY };
      return map2[side];
    }),
    insetInlineStart: map(placement, (v) => {
      const [, align] = v.split("-");
      const map2 = { start: offsetX, center: "50%", end: "auto" };
      return map2[align];
    }),
    insetInlineEnd: map(placement, (v) => {
      const [, align] = v.split("-");
      const map2 = { start: "auto", center: "50%", end: offsetX };
      return map2[align];
    }),
    translate: map(placement, (v) => {
      const [side, align] = v.split("-");
      const mapX = { start: "-50%", center: "-50%", end: "50%" };
      const mapY = { top: "-50%", middle: "-50%", bottom: "50%" };
      return `${mapX[align]} ${mapY[side]}`;
    }),
    ...rest
  };
},
defaultValues(props) {
  const offset = props.offset || "0";
  return { offset, offsetX: offset, offsetY: offset, placement: "top-end" };
}}

export const getFloatStyle = (styles = {}) => {
  const _styles = getPatternStyles(floatConfig, styles)
  return floatConfig.transform(_styles, patternFns)
}

export const float = (styles) => css(getFloatStyle(styles))
float.raw = getFloatStyle