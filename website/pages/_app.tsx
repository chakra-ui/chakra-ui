import { trackPageview } from "analytics/track-event"
import { DefaultSeo } from "next-seo"
import Head from "next/head"
import Router from "next/router"
import React from "react"
import siteConfig from "configs/site-config"
import "../src/styles/algolia.css"
import { ChakraProvider } from "@chakra-ui/core"
import theme from "theme"
import FontFace from "components/font-face"

Router.events.on("routeChangeComplete", (url) => {
  trackPageview(url)
})

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://static.cloudflareinsights.com" />
        <meta name="theme-color" content="#319795" />
      </Head>
      <DefaultSeo {...siteConfig.seo} />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
      <FontFace />
    </>
  )
}

export default App
