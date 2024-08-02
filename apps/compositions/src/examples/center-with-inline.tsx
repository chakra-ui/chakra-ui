import { Box, Center, Link } from "@chakra-ui/react"
import { LuArrowRight } from "react-icons/lu"

export const CenterWithInline = () => {
  return (
    <Link href="#">
      <Center inline gap="4">
        <Box>Visit Chakra UI</Box>
        <LuArrowRight />
      </Center>
    </Link>
  )
}
