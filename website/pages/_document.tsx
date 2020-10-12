import { ColorModeScript } from "@chakra-ui/core"
import { GAScript } from "analytics/ga-script"
import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document"

class Document extends NextDocument {
  public static getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    return NextDocument.getInitialProps(ctx)
  }

  public render(): JSX.Element {
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

// eslint-disable-next-line import/no-default-export
export default Document
