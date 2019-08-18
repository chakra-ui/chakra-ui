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
  typography,
} from "styled-system";
import extraConfig from "./config";

const truncate = props => {
  if (props.isTruncated) {
    return {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    };
  }
};

const Box = styled("div", {
  shouldForwardProp,
})(
  truncate,
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
  extraConfig,
);

export default Box;
