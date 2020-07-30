import {
  ColorModeProvider,
  CSSReset,
  GlobalStyle,
  PortalManager,
  ThemeProvider,
} from "@chakra-ui/core"
import theme from "@chakra-ui/theme"
import { trackPageview } from "analytics/track-event"
import { DefaultSeo } from "next-seo"
import React from "react"
import seo from "seo.config"
import "../styles/algolia.css"

Router.events.on("routeChangeComplete", (url) => {
  trackPageview(url)
})

const App = ({ Component, pageProps }) => {
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
