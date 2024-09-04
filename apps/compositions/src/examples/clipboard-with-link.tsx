"use client"

import { ClipboardLink, ClipboardRoot } from "compositions/ui/clipboard"

export const ClipboardWithLink = () => {
  return (
    <ClipboardRoot value="https://chakra-ui.com">
      <ClipboardLink color="blue.fg" textStyle="sm" />
    </ClipboardRoot>
  )
}
