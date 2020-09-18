import { ChakraProvider } from "@chakra-ui/core"

function App(props: any) {
  const { Component, pageProps } = props
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
