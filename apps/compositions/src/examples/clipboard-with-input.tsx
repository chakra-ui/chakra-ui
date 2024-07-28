import { Clipboard, Input } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"
import { LuCopy } from "react-icons/lu"

const value = "npm i @chakra-ui/react"

export const ClipboardWithInput = () => {
  return (
    <Clipboard.Root value={value} maxW="400px">
      <Clipboard.Control display="flex" gap="2">
        <Clipboard.Input asChild>
          <Input size="sm" />
        </Clipboard.Input>
        <Clipboard.Trigger asChild>
          <Button size="sm">
            <LuCopy /> Copy
          </Button>
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard.Root>
  )
}
