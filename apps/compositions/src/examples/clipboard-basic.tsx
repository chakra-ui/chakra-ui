import { Clipboard, IconButton } from "@chakra-ui/react"
import { LuCheck, LuClipboard } from "react-icons/lu"

export const ClipboardBasic = () => {
  return (
    <Clipboard.Root value="https://chakra-ui.com">
      <Clipboard.Trigger asChild>
        <IconButton size="sm" variant="subtle">
          <Clipboard.Indicator copied={<LuCheck />}>
            <LuClipboard />
          </Clipboard.Indicator>
        </IconButton>
      </Clipboard.Trigger>
    </Clipboard.Root>
  )
}
