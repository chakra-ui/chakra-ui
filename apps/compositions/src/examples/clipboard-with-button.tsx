import { ClipboardButton, ClipboardRoot } from "compositions/ui/clipboard"

export const ClipboardWithButton = () => {
  return (
    <ClipboardRoot value="https://chakra-ui.com">
      <ClipboardButton />
    </ClipboardRoot>
  )
}
