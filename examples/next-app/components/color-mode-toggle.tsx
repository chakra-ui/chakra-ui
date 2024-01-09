"use client"
import { Button, useColorMode } from "@chakra-ui/react"

export function ColorModeToggle() {
  const { toggleColorMode } = useColorMode()
  return <Button onClick={toggleColorMode}>Click me</Button>
}
