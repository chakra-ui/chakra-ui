import theme from "@chakra-ui/preset-base";
import {
  ColorMode,
  ColorModeProvider,
  createThemeContext,
  CSSReset,
} from "@chakra-ui/system";
import * as React from "react";

const [ThemeProvider, useTheme] = createThemeContext(theme);

const setup = (story: () => any) => (
  <ThemeProvider>
    <ColorModeProvider>
      <CSSReset />
      <ColorMode />
      {story()}
    </ColorModeProvider>
  </ThemeProvider>
);

export { ThemeProvider, useTheme };
export default setup;
