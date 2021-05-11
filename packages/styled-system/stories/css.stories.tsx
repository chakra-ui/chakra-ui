import defaultTheme from "@chakra-ui/theme"
import { Global, ThemeProvider } from "@emotion/react"
import styled from "@emotion/styled"
import * as React from "react"
import { css, SystemProps, toCSSVar } from "../src"

export default {
  title: "css",
}

const Box = styled("div")((props: any) => css(props.css)(props.theme))

const styles: SystemProps = {
  bg: "rgba(255,255,255,0.3)",
  backdropFilter: "auto",
  backdropBlur: "21px",
  color: "white",
  rounded: "lg",
  transform: "auto",
  translateX: "40px",
  px: 3,
  py: 2,
  _focus: {
    ring: "2px",
    ringOffset: "3px",
    ringOffsetColor: "gray",
    ringColor: "purple.300",
  },
}

const theme = toCSSVar(defaultTheme)
export const cssVars = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={(t: any) => ({ ":root": t.__cssVars })} />
      <Box
        css={{
          bgImage: "url(https://windicss.org/assets/bg-shop.jpg)",
          bgSize: "cover",
          height: "200px",
          width: "200px",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Box as="button" css={styles}>
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
