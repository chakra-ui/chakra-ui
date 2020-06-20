import React from "react"
import { ChakraProvider } from "@chakra-ui/core"
import theme from "@chakra-ui/theme"
import CSSReset from "@chakra-ui/css-reset"

function App(props: any) {
  const { Component, pageProps } = props
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
