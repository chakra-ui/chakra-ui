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
      <Html lang="en">
        <Head />
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
