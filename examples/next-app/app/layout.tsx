"use client"

import { ColorModeScript } from "@chakra-ui/react"
import Provider from "./provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <head />
      <body>
        <ColorModeScript type="cookie" nonce="testing" />
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
