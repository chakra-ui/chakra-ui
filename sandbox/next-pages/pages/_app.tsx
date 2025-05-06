import { ChakraProvider, defaultSystem } from "@sh3yk0-ui/react"
import { ThemeProvider } from "next-themes"
import { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <Component {...pageProps} />
      </ThemeProvider>
    </ChakraProvider>
  )
}
