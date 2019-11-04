import * as React from "react";
import { Box, BoxProps, SystemProps } from "@chakra-ui/layout";

interface FlexOptions {
  /**
   * Shorthand for Styled-System `alignItems` prop
   */
  align?: SystemProps["alignItems"];
  /**
   * Shorthand for Styled-System `justifyContent` prop
   */
  justify?: SystemProps["justifyContent"];
  /**
   * Shorthand for Styled-System `flexWrap` prop
   */
  wrap?: SystemProps["flexWrap"];
  /**
   * Shorthand for Styled-System `flexDirection` prop
   */
  direction?: SystemProps["flexDirection"];
}

export type FlexProps<P, T> = BoxProps<P, T> & FlexOptions;

const Flex = React.forwardRef(function Flex<P, T extends HTMLElement>(
  props: FlexProps<P, T>,
  ref: React.Ref<T>,
) {
  return (
    <Box
      ref={ref}
      display="flex"
      flexDirection={props.direction}
      alignItems={props.align}
      justifyContent={props.justify}
      flexWrap={props.wrap}
      {...props}
    />
  );
}) as <P = {}, T = HTMLElement>(
  props: FlexProps<P, T>,
) => React.ReactElement<FlexProps<P, T>>;

export default Flex;
