/** @jsx jsx */
import { jsx } from "@emotion/core";
import Box from "../Box";
import { useColorMode } from "../ColorModeProvider";

const Keyboard = props => {
  const { mode } = useColorMode();
  const bg = { light: "gray.100", dark: "whiteAlpha.50" };
  return (
    <Box
      as="kbd"
      bg={bg[mode]}
      rounded="md"
      border="1px"
      borderColor="inherit"
      // font="mono"
      fontSize="0.85em"
      fontWeight="bold"
      lineHeight="normal"
      py="0.2em"
      px="0.4em"
      whiteSpace="nowrap"
      {...props}
    />
  );
};

export default Keyboard;
