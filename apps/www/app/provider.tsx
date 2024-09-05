"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { Toaster } from "compositions/ui/toaster"
import { ThemeProvider } from "next-themes"
import { system } from "./theme"

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
