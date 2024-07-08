"use client"

import { Clipboard } from "@chakra-ui/react"
import { Tooltip } from "compositions/ui/tooltip"
import { LuCopy, LuCopyCheck } from "react-icons/lu"

export const ClipboardWithButton = () => {
  return (
    <Clipboard.Root value="https://chakra-ui.com">
      <Clipboard.Context>
        {({ copied }) => (
          <Tooltip
            content={copied ? "Copied!" : "Copy URL"}
            openDelay={500}
            closeDelay={200}
            closeOnPointerDown={false}
          >
            <Clipboard.Trigger>
              {copied ? <LuCopyCheck /> : <LuCopy />}
            </Clipboard.Trigger>
          </Tooltip>
        )}
      </Clipboard.Context>
    </Clipboard.Root>
  )
}
