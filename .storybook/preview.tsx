import theme from "@chakra-ui/preset-base"
import {
  ColorMode,
  ColorModeProvider,
  ThemeProvider,
  CSSReset,
} from "@chakra-ui/system"
import { Global } from "@emotion/core"
import { addDecorator } from "@storybook/react"
import * as React from "react"

addDecorator((storyFn: any) => (
  <ThemeProvider theme={theme}>
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
