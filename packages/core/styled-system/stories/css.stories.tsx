import { Global, ThemeProvider, useTheme } from "@emotion/react"
import styled from "@emotion/styled"
import * as React from "react"
import { css, SystemProps, toCSSVar } from "../src"

export default {
  title: "System / css",
}

const Box = styled("div")((props: any) => css(props.css)(props.theme))

type Styles = Record<string, SystemProps>

const styles: Styles = {
  button: {
    bg: "red.300",
    px: 4,
    transform: "auto",
    rotate: "4",
    py: 2,
    rounded: "lg",
    fontWeight: "bold",
    outline: 0,
    _hover: {
      rotate: "0",
    },
    _focusVisible: {
      bg: "red.400",
      ring: "2px",
      ringOffset: "2px",
      ringColor: "red.600",
    },
  },
}

export const cssVars = () => {
  const theme = toCSSVar(useTheme())
  return (
    <ThemeProvider theme={theme}>
      <Global styles={(t: any) => ({ ":root": t.__cssVars })} />
      <Box css={styles.background}>
        <Box as="button" css={styles.button}>
          Welcome
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export const Stack = () => {
  return (
    <Box
      css={{
        display: "flex",
        flexDirection: { base: "column", md: "row-reverse" },
        experimental_spaceX: { md: "40px" },
        experimental_spaceY: { base: "40px", md: "0px" },
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
  const defaultTheme = useTheme()
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

export const peerSelector = () => {
  return (
    <div>
      <input data-peer />
      <Box css={{ _peerFocus: { color: "red" } }}>Test 1</Box>
      <Box css={{ _peerFocus: { color: "green", fontWeight: "bold" } }}>
        Test 2
      </Box>
    </div>
  )
}
