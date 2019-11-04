import React from "react";
import { Box, BoxProps } from "@chakra-ui/layout";

export type TextProps<P, T> = BoxProps<P, T>;

const Text = React.forwardRef(function Text<P, T extends HTMLElement>(
  props: TextProps<P, T>,
  ref: React.Ref<T>,
) {
  return <Box ref={ref} as="p" {...props} />;
}) as <P, T extends HTMLElement>(
  props: TextProps<P, T>,
) => React.ReactElement<TextProps<P, T>>;

export default Text;
