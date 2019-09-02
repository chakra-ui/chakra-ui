/** @jsx jsx */
import { jsx } from "@emotion/core";
import Box from "../Box";
import { useColorMode } from "../ColorModeProvider";

const Kbd = props => {
  const { colorMode } = useColorMode();
  const bg = { light: "gray.100", dark: "whiteAlpha.50" };
  return (
    <Box
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
};

export default Kbd;
