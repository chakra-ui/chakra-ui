import React from "react"
import NextDocument, { Html, Head, Main, NextScript } from "next/document"
import GAScript from "analytics/ga-script"

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon.png" />
          <meta name="theme-color" content="#319795"></meta>
          <script async defer src="https://buttons.github.io/buttons.js" />
          <link
            rel="preload"
            as="font"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <GAScript />
        </body>
      </Html>
    )
  }
}

export default Document
