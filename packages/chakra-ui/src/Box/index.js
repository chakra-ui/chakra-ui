/** @jsx jsx */
import styled from "@emotion/styled";
import shouldForwardProp from "@styled-system/should-forward-prop";
import {
  background,
  border,
  color,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  typography
} from "styled-system";
import extraConfig from "./styled-system.config";

const wordBreakOptions = {
  normal: {
    wordBreak: "normal",
    overflowWrap: "normal"
  },
  words: {
    overflowWrap: "break-word"
  },
  all: {
    wordBreak: "break-all"
  },
  truncate: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
};

const wordBreak = props => {
  if (Object.keys(wordBreakOptions).includes(props.wordBreak)) {
    return wordBreakOptions[props.wordBreak];
  } else {
    return props.wordBreak;
  }
};

const Box = styled("div", {
  shouldForwardProp
})(
  wordBreak,
  layout,
  color,
  space,
  background,
  border,
  grid,
  position,
  shadow,
  typography,
  flexbox,
  extraConfig
);

export default Box;
