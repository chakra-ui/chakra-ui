import React from "react"
import { ChakraProvider } from "@chakra-ui/core"
import theme from "@chakra-ui/theme"

function App(props: any) {
  const { Component, pageProps } = props
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
