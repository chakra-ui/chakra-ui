import { ChakraProvider } from "@chakra-ui/core"
import { trackPageview } from "analytics/track-event"
import { FontFace } from "components/font-face"
import { siteConfig } from "configs/site-config"
import { NextComponentType, NextPageContext } from "next"
import { DefaultSeo } from "next-seo"
import Head from "next/head"
import Router, { NextRouter } from "next/router"
import "../src/styles/algolia.css"
import { customTheme } from "theme"

Router.events.on("routeChangeComplete", (url) => {
  trackPageview(url)
})

type AppRenderProps = {
  pageProps: object
  err?: Error
  Component: NextComponentType<NextPageContext, object, object>
  router?: NextRouter
}

const App = ({ Component, pageProps }: AppRenderProps): JSX.Element => {
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
      <ChakraProvider theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
      <FontFace />
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default App
