import { trackPageview } from "analytics/track-event"
import { DefaultSeo } from "next-seo"
import Head from "next/head"
import Router, { useRouter } from "next/router"
import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "theme"
import FontFace from "components/font-face"
import { getSeo } from "utils/seo"

Router.events.on("routeChangeComplete", (url) => {
  trackPageview(url)
})

const App = ({ Component, pageProps }) => {
  // Omit og:image in Docs pages.
  // It currently doesn't add any value and clutters discussions.
  const { pathname } = useRouter()
  const isDocsPage = pathname.startsWith("/docs/")
  const seo = getSeo({ omitOpenGraphImage: isDocsPage })

  return (
    <>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://static.cloudflareinsights.com" />
        <meta name="theme-color" content="#319795" />
        {process.env.NODE_ENV === "production" && (
          <script
            async
            defer
            data-domain="chakra-ui.com"
            src="https://plausible.io/js/plausible.js"
          />
        )}
      </Head>
      <DefaultSeo {...seo} />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
      <FontFace />
    </>
  )
}

export default App
