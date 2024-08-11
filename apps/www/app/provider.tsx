"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { Toaster } from "compositions/ui/toaster"
import { ThemeProvider } from "next-themes"

export const Provider = (props: { children: React.ReactNode }) => {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {props.children}
        <Toaster />
      </ThemeProvider>
    </ChakraProvider>
  )
}
