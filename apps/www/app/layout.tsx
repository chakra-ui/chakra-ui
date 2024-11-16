import { ProAdBanner } from "@/components/pro-banner"
import { docsConfig } from "@/docs.config"
import type { Metadata } from "next"
import { Figtree, Inter, Outfit, Roboto } from "next/font/google"
import localFont from "next/font/local"
import Script from "next/script"
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

const geistSans = localFont({
  src: "../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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
      className={[
        inter.variable,
        figTree.variable,
        roboto.variable,
        outfit.variable,
        geistSans.variable,
        geistMono.variable,
      ].join(" ")}
    >
      <head>
        <Script
          src="https://plausible.io/js/plausible.js"
          data-domain="chakra-ui.com"
        />
      </head>
      <body>
        <Provider>
          <ProAdBanner />
          {children}
        </Provider>
      </body>
    </html>
  )
}
