import { Clipboard, IconButton } from "@chakra-ui/react"
import { LuClipboard } from "react-icons/lu"
import { LuCheck } from "react-icons/lu"

export const ClipboardWithoutSnippet = () => {
  return (
    <Clipboard.Root value="https://chakra-ui.com">
      <Clipboard.Trigger asChild>
        <IconButton>
          <Clipboard.Indicator copied={<LuCheck />}>
            <LuClipboard />
          </Clipboard.Indicator>
        </IconButton>
      </Clipboard.Trigger>
    </Clipboard.Root>
  )
}
