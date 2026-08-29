import { Box, Button, Heading } from "@chakra-ui/react"

export default async function Page() {
  return (
    <Box p="8">
      <Heading size="2xl">Heading via static recipe, no provider (RSC)</Heading>
      <Button variant="solid" colorPalette="teal">
        solid teal
      </Button>
    </Box>
  )
}
