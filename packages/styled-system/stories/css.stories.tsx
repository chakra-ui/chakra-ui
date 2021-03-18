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

export const Stack = () => {
  return (
    <Box
      css={{
        display: "flex",
        flexDirection: { base: "column", md: "row-reverse" },
        spaceX: { md: "40px" },
        spaceY: { base: "40px", md: "0px" },
      }}
    >
      <div>Child 1</div>
      <div>Child 2</div>
      <div>Child 3</div>
    </Box>
  )
}

export const HoverFocus = () => {
  return (
    <Box
      as="button"
      css={{
        _focus: {
          bg: "pink.400",
        },
        _hover: {
          bg: "red.300",
        },
      }}
    >
      Welcome
    </Box>
  )
}

export const TextAndLayerStyles = () => {
  const theme = {
    ...defaultTheme,
    textStyles: {
      big: { fontSize: "40px", lineHeight: "80px" },
      responsiveValue: {
        fontSize: { base: "10px", sm: "20px" },
      },
    },
  }
  return (
    <ThemeProvider theme={toCSSVar(theme)}>
      <Box css={{ textStyle: "responsiveValue", fontSize: "60px" }}>
        Lorem ipsum is placeholder text commonly used in the graphic, print, and
        publishing industries for previewing layouts and visual mockups.
      </Box>
    </ThemeProvider>
  )
}
