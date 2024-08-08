import { IconButton } from "@chakra-ui/react"
import { LuVoicemail } from "react-icons/lu"

export const IconButtonRounded = () => {
  return (
    <IconButton aria-label="Call support" rounded="full">
      <LuVoicemail />
    </IconButton>
  )
}
