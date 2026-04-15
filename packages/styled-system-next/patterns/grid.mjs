import { getPatternStyles, patternFns } from '../helpers.mjs';
import { css } from '../css/index.mjs';

const gridConfig = {
transform(props, { map, isCssUnit }) {
  const { columnGap, rowGap, gap, columns, minChildWidth, ...rest } = props;
  const getValue = (v) => isCssUnit(v) ? v : `token(sizes.${v}, ${v})`;
  return {
    display: "grid",
    gridTemplateColumns: columns != null ? map(columns, (v) => `repeat(${v}, minmax(0, 1fr))`) : minChildWidth != null ? map(minChildWidth, (v) => `repeat(auto-fit, minmax(${getValue(v)}, 1fr))`) : void 0,
    gap,
    columnGap,
    rowGap,
    ...rest
  };
},
defaultValues(props) {
  return { gap: props.columnGap || props.rowGap ? void 0 : "8px" };
}}

export const getGridStyle = (styles = {}) => {
  const _styles = getPatternStyles(gridConfig, styles)
  return gridConfig.transform(_styles, patternFns)
}

export const grid = (styles) => css(getGridStyle(styles))
grid.raw = getGridStyle