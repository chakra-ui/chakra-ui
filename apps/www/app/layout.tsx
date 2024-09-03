import { docsConfig } from "@/docs.config"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Provider } from "./provider"
import "./scrollbar.css"
import "./shiki.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="en" className={inter.variable}>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
