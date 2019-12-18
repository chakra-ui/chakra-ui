import * as React from "react";
import { chakra, forwardRef, ChakraComponent } from "@chakra-ui/system";
import { BoxProps } from "../Box";

interface FlexOptions {
  /**
   * Shorthand for Styled-System `alignItems` prop
   */
  align?: BoxProps["alignItems"];
  /**
   * Shorthand for Styled-System `justifyContent` prop
   */
  justify?: BoxProps["justifyContent"];
  /**
   * Shorthand for Styled-System `flexWrap` prop
   */
  wrap?: BoxProps["flexWrap"];
  /**
   * Shorthand for Styled-System `flexDirection` prop
   */
  direction?: BoxProps["flexDirection"];
}

export type FlexProps = BoxProps & FlexOptions;

const Flex = forwardRef((props: FlexProps, ref: React.Ref<any>) => (
  <chakra.div
    ref={ref}
    display="flex"
    flexDirection={props.direction}
    alignItems={props.align}
    justifyContent={props.justify}
    flexWrap={props.wrap}
    {...props}
  />
)) as ChakraComponent<"div">;

export default Flex;
