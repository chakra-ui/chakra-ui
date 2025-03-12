import { Clipboard, IconButton, Input } from "@chakra-ui/react"
import { InputGroup } from "compositions/ui/input-group"

export const ClipboardWithInput = () => {
  return (
    <Clipboard.Root maxW="300px" value="https://sharechakra-ui.com/dfr3def">
      <Clipboard.Label textStyle="label">Document Link</Clipboard.Label>
      <InputGroup width="full" endElement={<ClipboardIconButton />}>
        <Clipboard.Input asChild>
          <Input />
        </Clipboard.Input>
      </InputGroup>
    </Clipboard.Root>
  )
}

const ClipboardIconButton = () => {
  return (
    <Clipboard.Trigger asChild>
      <IconButton variant="surface" size="xs" me="-2">
        <Clipboard.Indicator />
      </IconButton>
    </Clipboard.Trigger>
  )
}
