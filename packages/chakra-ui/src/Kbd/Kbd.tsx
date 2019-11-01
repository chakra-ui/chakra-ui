import * as React from "react";
import { Box, BoxProps } from "../Box";
import { useColorMode } from "../ColorModeProvider";

const Kbd = React.forwardRef(function Kbd<P, T>(
  props: BoxProps<P, T>,
  ref: React.Ref<T>,
) {
  const { colorMode } = useColorMode();
  const bg = { light: "gray.100", dark: "whiteAlpha.50" };
  return (
    <Box
      ref={ref}
      as="kbd"
      bg={bg[colorMode]}
      rounded="md"
      border="1px"
      borderColor="inherit"
      borderBottomWidth="3px"
      fontSize="0.8em"
      fontWeight="bold"
      lineHeight="normal"
      px="0.4em"
      whiteSpace="nowrap"
      {...props}
    />
  );
}) as <P, T = HTMLElement>(
  props: BoxProps<P, T>,
) => React.ReactElement<BoxProps<P, T>>;

export function KbdExample() {
  return <Kbd mx="100px" />;
}

export default Kbd;
