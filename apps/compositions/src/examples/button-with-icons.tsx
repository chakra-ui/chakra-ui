import { Stack } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"
import { FaArrowRight, FaEnvelope } from "react-icons/fa"

export const ButtonWithIcons = () => {
  return (
    <Stack direction="row" gap="4">
      <Button colorPalette="teal" variant="solid" startIcon={<FaEnvelope />}>
        Email
      </Button>
      <Button colorPalette="teal" variant="outline" endIcon={<FaArrowRight />}>
        Call us
      </Button>
    </Stack>
  )
}
