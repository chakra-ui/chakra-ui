import {
  createChakra,
  CreateChakraComponent,
  forwardRef,
  PropsOf,
} from "@chakra-ui/system";
import React from "react";

interface DividerOptions {
  orientation?: "horizontal" | "vertical";
}

export type DividerProps = PropsOf<typeof BaseDivider> & DividerOptions;

const BaseDivider = createChakra("hr");

const Divider = forwardRef(
  ({ orientation, ...props }: DividerProps, ref: React.Ref<any>) => (
    <BaseDivider
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
) as CreateChakraComponent<"hr", DividerOptions>;

export default Divider;
