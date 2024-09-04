import { ClipboardIconButton, ClipboardRoot } from "compositions/ui/clipboard"

export const ClipboardBasic = () => {
  return (
    <ClipboardRoot value="https://chakra-ui.com">
      <ClipboardIconButton />
    </ClipboardRoot>
  )
}
