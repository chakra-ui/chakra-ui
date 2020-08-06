import * as React from "react"
import { ChakraProvider, CSSReset, cookieStorageManager } from "@chakra-ui/core"
import theme from "@chakra-ui/theme"

const App = ({ Component, pageProps, cookies }) => {
  return (
    <ChakraProvider
      theme={theme}
      storageManager={cookieStorageManager(cookies)}
    >
      <CSSReset />
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
