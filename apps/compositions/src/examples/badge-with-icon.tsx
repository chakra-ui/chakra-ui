import { Badge, Stack } from "@chakra-ui/react"
import { HiAtSymbol, HiStar } from "react-icons/hi"

export const BadgeWithIcon = () => {
  return (
    <Stack align="flex-start">
      <Badge variant="solid" colorPalette="blue" size="md">
        <HiStar />
        New
      </Badge>
      <Badge variant="solid" colorPalette="green" size="md">
        New
        <HiAtSymbol />
      </Badge>
    </Stack>
  )
}
