import { css, Global } from "@emotion/core";
import * as React from "react";
import createThemeContext from "../../create-theme-context";
import theme from "@chakra-ui/preset-base";
import { ColorModeProvider, ColorMode } from "../../color-mode";

const [ThemeProvider, useTheme] = createThemeContext(theme);

const setup = (story: () => any) => (
  <ThemeProvider>
    <ColorModeProvider>
      <Global
        styles={css`
          * {
            font-family: "system-ui";
            box-sizing: border-box;
          }
        `}
      />
      <ColorMode />
      {story()}
    </ColorModeProvider>
  </ThemeProvider>
);

export { ThemeProvider, useTheme };
export default setup;
