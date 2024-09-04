import { ClipboardButton, ClipboardRoot } from "compositions/ui/clipboard"

export const ClipboardWithTimeout = () => {
  return (
    <ClipboardRoot value="https://chakra-ui.com" timeout={1000}>
      <ClipboardButton />
    </ClipboardRoot>
  )
}
