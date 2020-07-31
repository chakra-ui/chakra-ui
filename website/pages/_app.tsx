import { ChakraProvider, CSSReset, PortalManager } from "@chakra-ui/core"
import theme from "@chakra-ui/theme"
import { MDXProvider } from "@mdx-js/react"
import { trackPageview } from "analytics/track-event"
import MDXComponents from "components/mdx-components"
import { DefaultSeo } from "next-seo"
import Head from "next/head"
import Router from "next/router"
import React from "react"
import siteConfig from "site.config"
import "../src/styles/algolia.css"

Router.events.on("routeChangeComplete", (url) => {
  trackPageview(url)
})

const font = `Inter, -apple-system, sans-serif`

theme.fonts = {
  ...theme.fonts,
  heading: font,
  body: font,
}

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon.png" />
        <meta name="theme-color" content="#319795" />
        <script async defer src="https://buttons.github.io/buttons.js" />
      </Head>

      <ChakraProvider theme={theme}>
        <CSSReset />
        <DefaultSeo {...siteConfig.seo} />
        <MDXProvider components={MDXComponents}>
          <PortalManager zIndex={40}>
            <Component {...pageProps} />
          </PortalManager>
        </MDXProvider>
      </ChakraProvider>
    </>
  )
}

export default App
