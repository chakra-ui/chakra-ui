"use client"

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react"
import { Toaster } from "compositions/ui/toaster"
import { ThemeProvider } from "next-themes"

const system = createSystem(defaultConfig, {
  globalCss: {
    ":root": {
      "--header-height": { base: "64px", md: "104px" },
      "--content-height": "calc(100dvh - var(--header-height))",
    },
  },
})

export const Provider = (props: { children: React.ReactNode }) => {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {props.children}
        <Toaster />
      </ThemeProvider>
    </ChakraProvider>
  )
}
