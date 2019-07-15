/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import Box from "./Box";
export { default as Box } from "./Box";

export const Flex = forwardRef((props, ref) => (
  <Box display="flex" ref={ref} {...props} />
));

export const Absolute = forwardRef((props, ref) => (
  <Box position="absolute" ref={ref} {...props} />
));

export const Grid = forwardRef((props, ref) => (
  <Box display="grid" ref={ref} {...props} />
));

export const Fixed = forwardRef((props, ref) => (
  <Box position="fixed" ref={ref} {...props} />
));
