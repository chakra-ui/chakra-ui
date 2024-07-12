import { HStack } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"
import { FaArrowRight, FaEnvelope } from "react-icons/fa"

export const ButtonWithIcons = () => {
  return (
    <HStack>
      <Button colorPalette="teal" variant="solid">
        <FaEnvelope /> Email
      </Button>
      <Button colorPalette="teal" variant="outline">
        Call us <FaArrowRight />
      </Button>
    </HStack>
  )
}
