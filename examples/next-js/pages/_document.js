import { ColorModeScript } from "@chakra-ui/react"
import { Head, Html, Main, NextScript } from "next/document"
import { colorModeConfig } from "../lib/color-mode-utils"

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <ColorModeScript initialColorMode={colorModeConfig.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
