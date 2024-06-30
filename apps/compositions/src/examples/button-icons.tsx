import { IconButton, Stack } from "@chakra-ui/react"
import { FaPhone, FaSearch } from "react-icons/fa"

export const ButtonIcons = () => (
  <Stack direction="row">
    <IconButton aria-label="Search database">
      <FaSearch />
    </IconButton>

    <IconButton colorPalette="blue" aria-label="Search database">
      <FaSearch />
    </IconButton>

    <IconButton colorPalette="teal" aria-label="Call Segun" size="lg">
      <FaPhone />
    </IconButton>
  </Stack>
)
