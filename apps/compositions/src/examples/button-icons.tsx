import { IconButton, Stack } from "@chakra-ui/react"
import { RiPhoneLine, RiSearchLine } from "react-icons/ri"

export const ButtonIcons = () => (
  <Stack direction="row">
    <IconButton aria-label="Search database">
      <RiSearchLine />
    </IconButton>

    <IconButton colorPalette="blue" aria-label="Search database">
      <RiSearchLine />
    </IconButton>

    <IconButton colorPalette="teal" aria-label="Call Segun" size="lg">
      <RiPhoneLine />
    </IconButton>
  </Stack>
)
