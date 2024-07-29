"use client"

import { Button, Clipboard } from "@chakra-ui/react"
import { LuCopy, LuCopyCheck } from "react-icons/lu"

export const ClipboardWithTimeout = () => {
  return (
    <Clipboard.Root value="https://chakra-ui.com" timeout={1000}>
      <Clipboard.Context>
        {({ copied }) => (
          <Clipboard.Trigger asChild>
            <Button size="sm">
              {copied ? <LuCopyCheck /> : <LuCopy />}{" "}
              {copied ? "Copied" : "Copy"}
            </Button>
          </Clipboard.Trigger>
        )}
      </Clipboard.Context>
    </Clipboard.Root>
  )
}
