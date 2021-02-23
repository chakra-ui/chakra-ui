import defaultTheme from "@chakra-ui/theme"
import { Global, ThemeProvider } from "@emotion/react"
import styled from "@emotion/styled"
import * as React from "react"
import { css, toCSSVar } from "../src"

export default {
  title: "css",
}

const Box = styled("div")((props: any) => css(props.css)(props.theme))

const theme = toCSSVar(defaultTheme)
export const cssVars = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={(t: any) => ({ ":root": t.__cssVars })} />
      <Box css={{ mt: ["-8", "12"], color: "red.400" }}>Welcome</Box>
    </ThemeProvider>
  )
}
