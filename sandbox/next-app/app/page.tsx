import { Box, Button } from "@chakra-ui/react"

export default async function Page() {
  return (
    <Box p="8" bg="red.500" color="white">
      hello rsc
      <Button variant="solid" colorPalette="teal">
        solid teal
      </Button>
    </Box>
  )
}
