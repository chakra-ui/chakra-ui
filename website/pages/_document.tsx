import React from "react"
import NextDocument, { Html, Head, Main, NextScript } from "next/document"
import GAScript from "analytics/ga-script"
import GoogleFonts from "next-google-fonts"

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
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
