import { Clipboard } from "@chakra-ui/react"
import { LuCopy } from "react-icons/lu"

export const ClipboardBasic = () => {
  const value = "gh repo clone chakra-ui/chakra-ui"
  return (
    <Clipboard.Root value={value}>
      <Clipboard.Control>
        <Clipboard.Input fontFamily="mono">{value}</Clipboard.Input>
        <Clipboard.Trigger>
          <LuCopy /> Copy
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard.Root>
  )
}
