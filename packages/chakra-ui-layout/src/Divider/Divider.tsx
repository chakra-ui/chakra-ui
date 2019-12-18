import { chakra, PropsOf } from "@chakra-ui/system";
import React, { forwardRef } from "react";

export type DividerProps = PropsOf<typeof chakra.hr> & {
  orientation?: "horizontal" | "vertical";
};

const Divider = forwardRef(
  ({ orientation, ...props }: DividerProps, ref: React.Ref<any>) => {
    return (
      <chakra.hr
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
  },
);

export default Divider;
