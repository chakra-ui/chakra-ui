import defaultTheme from "@chakra-ui/theme"
import { Global, ThemeProvider } from "@emotion/react"
import styled from "@emotion/styled"
import * as React from "react"
import { css, resolveStyleConfig, toCSSVar } from "../src"
import { recipe } from "../tests/theme"

export default {
  title: "System / css",
}

const Box = styled("div")((props: any) => css(props.css)(props.theme))

const theme = toCSSVar(defaultTheme)

export const responsiveButton = () => {
  const styles = recipe({
    theme,
    variant: ["solid", "outline", "link"],
    size: ["sm", "md", "lg"],
  })
  return (
    <ThemeProvider theme={theme}>
      <Global styles={(theme: any) => ({ ":root": theme.__cssVars })} />
      <Box as="button" css={styles}>
        Button
      </Box>
    </ThemeProvider>
  )
}

export const multipartAlert = () => {
  const props = {
    variant: ["left-accent", "top-accent", "subtle"],
    colorScheme: "red",
    theme,
  }
  const styles = resolveStyleConfig(defaultTheme.components.Alert)(props)
  return (
    <ThemeProvider theme={theme}>
      <pre style={{ fontSize: "small" }}>{JSON.stringify(styles, null, 2)}</pre>
      <Global styles={(theme: any) => ({ ":root": theme.__cssVars })} />
      <Box css={styles.container}>
        <Box css={styles.title}>Welcome</Box>
      </Box>
    </ThemeProvider>
  )
}
