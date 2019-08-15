/** @jsx jsx */
import { jsx } from "@emotion/core";
import ColorModeProvider, { useColorMode } from "../ColorModeProvider";
import ThemeProvider, { useTheme } from "../ThemeProvider";

const ChakraProvider = ({ theme, children }) => {
  return (
    <ColorModeProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeProvider>
  );
};

const useChakra = () => {
  const theme = useTheme();
  const { mode, toggle } = useColorMode;
  return { theme, mode, toggle };
};

export default ChakraProvider;
export { useChakra };
