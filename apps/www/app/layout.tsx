import { docsConfig } from "@/docs.config"
import type { Metadata } from "next"
import { Figtree, Inter, Outfit, Roboto } from "next/font/google"
import { Provider } from "./provider"
import "./scrollbar.css"
import "./shiki.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const figTree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
})

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://next.chakra-ui.com"),
  title: {
    template: docsConfig.titleTemplate,
    default: docsConfig.title,
  },
  description: docsConfig.description,
  openGraph: {
    images: "/og-image.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${figTree.variable} ${roboto.variable} ${outfit.variable}`}
    >
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
