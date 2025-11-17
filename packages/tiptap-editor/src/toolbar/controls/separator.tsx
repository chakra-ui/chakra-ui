"use client"

import { Separator as ChakraSeparator } from "@chakra-ui/react"

/**
 * Visual separator for toolbar controls
 * Use within ControlsGroup or Toolbar to separate groups of controls
 */
export function Separator() {
  return (
    <ChakraSeparator
      orientation="vertical"
      height="6"
      mx="1"
      borderColor="border"
    />
  )
}
