import { ChakraProvider } from "@chakra-ui/core"
import * as chakraComponents from "@chakra-ui/core"
import theme from "theme"
import { MDXProvider } from "@mdx-js/react"
import { trackPageview } from "analytics/track-event"
import MDXComponents from "components/mdx-components"
import { DefaultSeo } from "next-seo"
import Head from "next/head"
import Router from "next/router"
import React from "react"
import siteConfig from "configs/site-config"
import "../src/styles/algolia.css"

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
        <meta name="theme-color" content="#319795" />
        <script async defer src="https://buttons.github.io/buttons.js" />
      </Head>
      <ChakraProvider resetCSS theme={theme} portalZIndex={40}>
        <DefaultSeo {...siteConfig.seo} />
        <MDXProvider components={{ ...chakraComponents, ...MDXComponents }}>
          <Component {...pageProps} />
        </MDXProvider>
      </ChakraProvider>
    </>
  )
}

export default App
