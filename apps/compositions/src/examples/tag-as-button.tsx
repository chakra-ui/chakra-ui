import { Tag } from "@chakra-ui/react"
import { LuCheck } from "react-icons/lu"

export const TagAsButton = () => {
  return (
    <Tag.Root asChild variant="solid">
      <button type="submit">
        <Tag.Label>Fish </Tag.Label>
        <LuCheck />
      </button>
    </Tag.Root>
  )
}
