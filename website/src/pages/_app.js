import React, { useEffect } from "react"
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
  GlobalStyle,
  PortalManager,
} from "@chakra-ui/core"
import theme from "@chakra-ui/theme"
import { DefaultSeo } from "next-seo"
import seo from "seo.config"
import { useRouter } from "next/router"
import initClient from "analytics/on-init-client"
import "../styles/algolia.css"

const App = ({ Component, pageProps }) => {
  const router = useRouter()
  useEffect(() => {
    initClient({ router })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <GlobalStyle />
        <CSSReset />
        <PortalManager zIndex={40}>
          <DefaultSeo {...seo} />
          <Component {...pageProps} />
        </PortalManager>
      </ColorModeProvider>
    </ThemeProvider>
  )
}

export default App
