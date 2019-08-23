import React from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import NoFlashSript from "../components/NoFlashSript";

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <NoFlashSript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
