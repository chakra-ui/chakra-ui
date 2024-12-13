import { IconButton } from "@chakra-ui/react"
import { LuX } from "react-icons/lu"

export const CloseButtonWithoutSnippet = () => {
  return (
    <IconButton variant="ghost" aria-label="Close">
      <LuX />
    </IconButton>
  )
}
