import React, { forwardRef } from "react";
import { Box, BoxProps } from "../Box";

export type DividerProps = BoxProps & {
  orientation?: "horizontal" | "vertical";
};

const Divider = forwardRef(function Divider(
  { orientation, ...props }: DividerProps,
  ref: React.Ref<any>,
) {
  return (
    <Box
      ref={ref}
      as="hr"
      marginY="8px"
      role="separator"
      aria-orientation={orientation}
      border="0"
      borderBottom="1px"
      opacity={0.6}
      borderColor="inherit"
      {...props}
    />
  );
});

export default Divider;
