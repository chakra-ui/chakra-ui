import {
  chakra,
  PropsOf,
  forwardRef,
  ChakraComponent,
} from "@chakra-ui/system";
import React from "react";

interface DividerOptions {
  orientation?: "horizontal" | "vertical";
}

export type DividerProps = PropsOf<typeof chakra.hr> & DividerOptions;

const Divider = forwardRef(
  ({ orientation, ...props }: DividerProps, ref: React.Ref<any>) => (
    <chakra.hr
      ref={ref}
      marginY="8px"
      role="separator"
      aria-orientation={orientation}
      border="0"
      borderBottom="1px"
      opacity={0.6}
      borderColor="inherit"
      {...props}
    />
  ),
) as ChakraComponent<"hr", DividerOptions>;

export default Divider;
