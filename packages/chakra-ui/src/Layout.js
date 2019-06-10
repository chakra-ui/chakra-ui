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
  style,
  compose
} from "styled-system";

const textDecoration = style({
  prop: "textDecoration",
  cssProperty: "textDecoration"
});

const appearance = style({
  prop: "appearance",
  cssProperty: "appearance"
});

const cursor = style({
  prop: "cursor",
  cssProperty: "cursor"
});

const pointerEvents = style({
  prop: "pointerEvents",
  cssProperty: "pointerEvents"
});

const userSelect = style({
  prop: "userSelect",
  cssProperty: "userSelect"
});

const whiteSpace = style({
  prop: "whiteSpace",
  cssProperty: "whiteSpace"
});

const textTransform = style({
  prop: "textTransform",
  cssProperty: "textTransform"
});

const transform = style({
  prop: "transform",
  cssProperty: "transform"
});

const transition = style({
  prop: "transition",
  cssProperty: "transition"
});

const otherProps = compose(
  textDecoration,
  appearance,
  textTransform,
  transform,
  whiteSpace,
  userSelect,
  pointerEvents,
  cursor,
  transition
);

export const Box = styled.div`
  ${layout}
  ${color}
  ${space}
  ${background}
  ${border}
  ${position}
  ${shadow}
  ${typography}
  ${flexbox}
  ${otherProps}
`;

export const Flex = forwardRef((props, ref) => (
  <Box display="flex" ref={ref} {...props} />
));

export const Absolute = forwardRef((props, ref) => (
  <Box position="absolute" ref={ref} {...props} />
));

export const Grid = styled(Box)`
  ${grid}
`;
