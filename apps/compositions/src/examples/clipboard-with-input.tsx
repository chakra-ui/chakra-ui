import {
  ClipboardIconButton,
  ClipboardInput,
  ClipboardLabel,
  ClipboardRoot,
} from "compositions/ui/clipboard"
import { InputGroup } from "compositions/ui/input-group"

export const ClipboardWithInput = () => {
  return (
    <ClipboardRoot maxW="300px" value="https://sharechakra-ui.com/dfr3def">
      <ClipboardLabel>Document Link</ClipboardLabel>
      <InputGroup width="full" endElement={<ClipboardIconButton me="-2" />}>
        <ClipboardInput />
      </InputGroup>
    </ClipboardRoot>
  )
}
