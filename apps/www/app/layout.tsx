import { docsConfig } from "@/docs.config"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import { Provider } from "./provider"
import "./shiki.css"

const inter = Inter({ subsets: ["latin"] })
const satoshi = localFont({
  src: "../public/fonts/Satoshi-Variable.woff2",
  variable: "--satoshi",
})

export const metadata: Metadata = {
  title: {
    template: docsConfig.titleTemplate,
    default: docsConfig.title,
  },
  description: docsConfig.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${satoshi.variable}`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
