import { IconButton } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"

export const IconButtonBasic = () => {
  return (
    <IconButton aria-label="Search database">
      <LuSearch />
    </IconButton>
  )
}
