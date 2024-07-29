"use client"

import { Clipboard } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"
import { LuCheck, LuCopy } from "react-icons/lu"

export const ClipboardWithButton = () => {
  return (
    <Clipboard.Root value="https://chakra-ui.com">
      <Clipboard.Context>
        {({ copied }) => (
          <Clipboard.Trigger asChild>
            <Button size="sm" variant="subtle">
              {copied ? <LuCheck /> : <LuCopy />} {copied ? "Copied" : "Copy"}
            </Button>
          </Clipboard.Trigger>
        )}
      </Clipboard.Context>
    </Clipboard.Root>
  )
}
