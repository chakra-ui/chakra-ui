import { ClipboardButton } from "compositions/ui/clipboard"

export const ClipboardWithTimeout = () => {
  return <ClipboardButton value="https://chakra-ui.com" timeout={1000} />
}
