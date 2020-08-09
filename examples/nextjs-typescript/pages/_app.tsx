import React from "react"
import { ChakraProvider } from "@chakra-ui/core"

function App(props: any) {
  const { Component, pageProps } = props
  return (
    <ChakraProvider resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
