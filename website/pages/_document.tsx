import React from "react"
import NextDocument, { Html, Head, Main, NextScript } from "next/document"
import GAScript from "analytics/ga-script"
import { ColorModeScript } from "@chakra-ui/core"

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/Inter.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <ColorModeScript />
          <Main />
          <NextScript />
          <GAScript />
        </body>
      </Html>
    )
  }
}

export default Document
