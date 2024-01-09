import { Box, Text } from "@chakra-ui/react"
import { ColorModeToggle } from "../components/color-mode-toggle"

export default async function Page() {
  return (
    <Box textAlign="center" fontSize="xl">
      <Text>Welcome to Chakra UI + Next.js</Text>
      <ColorModeToggle />
    </Box>
  )
}
