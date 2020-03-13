import React from "react"
import NextDocument, { Html, Head, Main, NextScript } from "next/document"

const GTMScript = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PLT3CZ5');`,
    }}
  ></script>
)

const GTMNoScript = () => (
  <noscript>
    <iframe
      title="gtm"
      src="https://www.googletagmanager.com/ns.html?id=GTM-PLT3CZ5"
      height="0"
      width="0"
      style={{ display: "none", visibility: "hidden" }}
    ></iframe>
  </noscript>
)

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <GTMScript />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta title="Chakra Design System" />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="../static/favicon.png"
          />
          <meta name="theme-color" content="#319795"></meta>
        </Head>
        <body>
          <GTMNoScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
