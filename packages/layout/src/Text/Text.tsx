import React from "react";
import { Box, BoxProps } from "../Box";
import {
  chakra,
  PropsOf,
  forwardRef,
  ChakraComponent,
} from "@chakra-ui/system";

export type TextProps = PropsOf<typeof chakra.p>;

const Text = forwardRef((props: TextProps, ref: React.Ref<any>) => {
  return <chakra.p ref={ref} fontFamily="body" {...props} />;
}) as ChakraComponent<"p">;

export default Text;
