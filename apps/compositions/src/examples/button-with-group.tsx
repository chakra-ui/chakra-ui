import { Group, IconButton } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"
import { LuChevronDown } from "react-icons/lu"

export const ButtonWithGroup = () => {
  return (
    <Group attached>
      <Button variant="outline" size="sm">
        Button
      </Button>
      <IconButton variant="outline" size="sm">
        <LuChevronDown />
      </IconButton>
    </Group>
  )
}
