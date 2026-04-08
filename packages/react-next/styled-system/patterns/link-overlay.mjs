import { getPatternStyles, patternFns } from '../helpers.mjs';
import { css } from '../css/index.mjs';

const linkOverlayConfig = {
transform(props) {
  return {
    _before: {
      content: '""',
      position: "absolute",
      inset: "0",
      zIndex: "0",
      ...props["_before"]
    },
    ...props
  };
}}

export const getLinkOverlayStyle = (styles = {}) => {
  const _styles = getPatternStyles(linkOverlayConfig, styles)
  return linkOverlayConfig.transform(_styles, patternFns)
}

export const linkOverlay = (styles) => css(getLinkOverlayStyle(styles))
linkOverlay.raw = getLinkOverlayStyle