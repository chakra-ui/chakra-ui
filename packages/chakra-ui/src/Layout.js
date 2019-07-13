/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { forwardRef } from "react";
import {
  color,
  flexbox,
  layout,
  space,
  grid,
  background,
  border,
  position,
  shadow,
  typography,
  system
} from "styled-system";
import shouldForwardProp from "@styled-system/should-forward-prop";

const otherProps = system({
  textDecoration: true,
  appearance: true,
  textTransform: true,
  transform: true,
  whiteSpace: true,
  userSelect: true,
  pointerEvents: true,
  cursor: true,
  transition: true
});

export const Box = styled("div", {
  shouldForwardProp
})(
  layout,
  color,
  space,
  background,
  border,
  position,
  shadow,
  typography,
  flexbox,
  otherProps
);

export const Flex = forwardRef((props, ref) => (
  <Box display="flex" ref={ref} {...props} />
));

export const Absolute = forwardRef((props, ref) => (
  <Box position="absolute" ref={ref} {...props} />
));

export const Grid = styled(Box)`
  ${grid}
`;
