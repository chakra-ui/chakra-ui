import theme from "@chakra-ui/preset-base";
import {
  ColorMode,
  ColorModeProvider,
  createThemeContext,
  CSSReset,
} from "@chakra-ui/system";
import * as React from "react";
import { Global } from "@emotion/core";
import { PortalManager } from "@chakra-ui/portal";

const [ThemeProvider, useTheme] = createThemeContext(theme);

const setup = (story: () => any) => (
  <PortalManager>
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
  </PortalManager>
);

export { ThemeProvider, useTheme };
export default setup;
