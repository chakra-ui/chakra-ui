import React from "react"
import NextDocument, { Html, Head, Main, NextScript } from "next/document"
import headTags from "src/analytics/document-head-tags-server"

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
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          {/* {headTags()} */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
