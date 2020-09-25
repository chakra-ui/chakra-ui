import { ColorModeScript } from "@chakra-ui/core"
import NextDocument, { Html, Head, Main, NextScript } from "next/document"

export default class Document extends NextDocument {
  static getInitialProps(ctx) {
    return NextDocument.getInitialProps(ctx)
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
