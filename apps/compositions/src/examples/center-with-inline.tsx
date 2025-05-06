import { Box, Center, Link } from "@sh3yk0-ui/react"
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
