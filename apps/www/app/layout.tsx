import { docsConfig } from "@/docs.config"
import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import { Provider } from "./provider"
import "./scrollbar.css"
import "./shiki.css"

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
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
    <html lang="en" className={figtree.variable}>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
