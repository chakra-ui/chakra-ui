import { ChakraProvider } from "@chakra-ui/core"
import theme from "theme"
import { trackPageview } from "analytics/track-event"
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://static.cloudflareinsights.com" />
        <meta name="theme-color" content="#319795" />
      </Head>
      <ChakraProvider resetCSS theme={theme} portalZIndex={40}>
        <DefaultSeo {...siteConfig.seo} />
        <Component {...pageProps} />
      </ChakraProvider>
      <style jsx global>
        {`
          @font-face {
            font-family: "Inter";
            font-style: normal;
            font-weight: 100;
            font-display: block;
            src: url(/fonts/Inter.woff2) format("woff2");
          }

          @font-face {
            font-family: "Inter";
            font-style: normal;
            font-weight: 200;
            font-display: block;
            src: url(/fonts/Inter.woff2) format("woff2");
          }

          @font-face {
            font-family: "Inter";
            font-style: normal;
            font-weight: 300;
            font-display: block;
            src: url(/fonts/Inter.woff2) format("woff2");
          }

          @font-face {
            font-family: "Inter";
            font-style: normal;
            font-weight: 400;
            font-display: block;
            src: url(/fonts/Inter.woff2) format("woff2");
          }

          @font-face {
            font-family: "Inter";
            font-style: normal;
            font-weight: 500;
            font-display: block;
            src: url(/fonts/Inter.woff2) format("woff2");
          }

          @font-face {
            font-family: "Inter";
            font-style: normal;
            font-weight: 600;
            font-display: block;
            src: url(/fonts/Inter.woff2) format("woff2");
          }

          @font-face {
            font-family: "Inter";
            font-style: normal;
            font-weight: 700;
            font-display: block;
            src: url(/fonts/Inter.woff2) format("woff2");
          }

          @font-face {
            font-family: "Inter";
            font-style: normal;
            font-weight: 800;
            font-display: block;
            src: url(/fonts/Inter.woff2) format("woff2");
          }

          @font-face {
            font-family: "Inter";
            font-style: normal;
            font-weight: 900;
            font-display: block;
            src: url(/fonts/Inter.woff2) format("woff2");
          }
        `}
      </style>
    </>
  )
}

export default App
