import { Button, VisuallyHidden } from "@chakra-ui/react"
import { LuBell } from "react-icons/lu"

export const VisuallyHiddenBasic = () => {
  return (
    <Button>
      <LuBell /> 3 <VisuallyHidden>Notifications</VisuallyHidden>
    </Button>
  )
}
