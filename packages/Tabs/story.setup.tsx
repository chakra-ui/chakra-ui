import theme from "@chakra-ui/preset-base";
import {
  ColorMode,
  ColorModeProvider,
  createThemeContext,
  CSSReset,
} from "@chakra-ui/system";
import * as React from "react";
import { Global } from "@emotion/core";

const [ThemeProvider, useTheme] = createThemeContext(theme);

const setup = (story: () => any) => (
  <ThemeProvider>
    <ColorModeProvider>
      <CSSReset />
      <ColorMode />
      <Global
        styles={{
          "*": {
            fontFamily: "system-ui",
          },
        }}
      />
      {story()}
    </ColorModeProvider>
  </ThemeProvider>
);

export { ThemeProvider, useTheme };
export default setup;
