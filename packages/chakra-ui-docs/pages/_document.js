import React from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

const script = `
window && window.docsearch({
    apiKey: 'df1dcc41f7b8e5d68e73dd56d1e19701',
    indexName: 'chakra-ui',
    inputSelector: '#algolia-search',
    debug: true,
    transformData(hits){
      console.log(hits)
    }
  })
`;

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
          {/* <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/docsearch.js@v2.6.3/dist/cdn/docsearch.min.css"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* <script src="https://cdn.jsdelivr.net/npm/docsearch.js@v2.6.3/dist/cdn/docsearch.min.js" />
          <script dangerouslySetInnerHTML={{ __html: script }} /> */}
        </body>
      </Html>
    );
  }
}

export default Document;
