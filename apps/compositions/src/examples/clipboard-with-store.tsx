"use client"

import { Button, useClipboard } from "@sh3yk0-ui/react"

export const ClipboardWithStore = () => {
  const clipboard = useClipboard({ value: "https://chakra-ui.com" })
  return (
    <Button variant="surface" size="sm" onClick={clipboard.copy}>
      {clipboard.copied ? "Copied" : "Copy"}
    </Button>
  )
}
