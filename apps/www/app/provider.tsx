"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { ColorModeProvider } from "compositions/ui/color-mode"
import { Toaster } from "compositions/ui/toaster"
import { system } from "./theme"

export const Provider = (props: { children: React.ReactNode }) => {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>
        {props.children}
        <Toaster />
      </ColorModeProvider>
    </ChakraProvider>
  )
}
