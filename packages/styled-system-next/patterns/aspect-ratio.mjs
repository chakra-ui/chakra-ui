import { getPatternStyles, patternFns } from '../helpers.mjs';
import { css } from '../css/index.mjs';

const aspectRatioConfig = {
transform(props, { map }) {
  const { ratio = 4 / 3, ...rest } = props;
  return {
    position: "relative",
    _before: {
      content: `""`,
      display: "block",
      height: "0",
      paddingBottom: map(ratio, (r) => `${1 / r * 100}%`)
    },
    "&>*": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%"
    },
    "&>img, &>video": {
      objectFit: "cover"
    },
    ...rest
  };
}}

export const getAspectRatioStyle = (styles = {}) => {
  const _styles = getPatternStyles(aspectRatioConfig, styles)
  return aspectRatioConfig.transform(_styles, patternFns)
}

export const aspectRatio = (styles) => css(getAspectRatioStyle(styles))
aspectRatio.raw = getAspectRatioStyle