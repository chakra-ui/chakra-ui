import { PortalManager } from "@chakra-ui/portal"
import theme from "@chakra-ui/preset-base"
import {
  ColorMode,
  ColorModeProvider,
  createThemeContext,
  CSSReset,
} from "@chakra-ui/system"
import { Global } from "@emotion/core"
import * as React from "react"
import { ColorModeProvider } from "@chakra-ui/color-mode"

const [ThemeProvider] = createThemeContext(theme)

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
)

export default setup
