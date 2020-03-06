import theme from "@chakra-ui/preset-base"
import {
  ColorMode,
  ColorModeProvider,
  createThemeContext,
  CSSReset,
} from "@chakra-ui/system"
import { Global } from "@emotion/core"
import { addDecorator } from "@storybook/react"
import * as React from "react"

const [ThemeProvider] = createThemeContext(theme)

addDecorator((storyFn: any) => (
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
      {storyFn()}
    </ColorModeProvider>
  </ThemeProvider>
))
