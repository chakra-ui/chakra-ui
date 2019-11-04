/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Box, BoxProps } from "@chakra-ui/layout";
import { forwardRef } from "react";

type DividerProps<P> = BoxProps<P, HTMLHRElement> & { orientation?: string };

const Divider = forwardRef(function Divider<P>(
  { orientation, ...props }: DividerProps<P>,
  ref: React.Ref<HTMLHRElement>,
) {
  return (
    <Box
      ref={ref}
      as="hr"
      my="8px"
      role="separator"
      aria-orientation={orientation}
      border="0"
      borderBottom="1px"
      opacity="0.6"
      borderColor="inherit"
      {...props}
    />
  );
}) as <P>(props: DividerProps<P>) => React.ReactElement<DividerProps<P>>;

export default Divider;
