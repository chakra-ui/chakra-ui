import * as React from "react"
import { ChakraProvider, cookieStorageManager } from "@chakra-ui/core"
import theme from "@chakra-ui/theme"

const App = ({ Component, pageProps, cookies }) => {
  return (
    <ChakraProvider
      resetCSS
      theme={theme}
      storageManager={cookieStorageManager(cookies)}
    >
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

App.getInitialProps = async ({ ctx }) => {
  return {
    cookies: ctx.req.headers.cookie,
  }
}

export default App
