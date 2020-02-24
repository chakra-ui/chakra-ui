import React from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta title="Chakra Design System" />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="../static/favicon.png"
          />
          <meta name="theme-color" content="#319795"></meta>
          <script async defer src="https://buttons.github.io/buttons.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
