import { useState } from "react"
import { Box, Button, Stack, Text } from "../src"

export default {
  title: "Foundations / Sandbox",
  decorators: [
    (Story: any) => (
      <Box padding={5}>
        <Story />
      </Box>
    ),
  ],
}

const TimeStamp = () => {
  const [data] = useState(() => new Date().toISOString())
  return <Text>{data}</Text>
}

export const ReRenders = () => {
  const [isRed, setIsRed] = useState(false)

  return (
    <Stack gap={5}>
      <Box backgroundColor={isRed ? "red.200" : "blue.200"}>
        <TimeStamp />
      </Box>

      <Box as="mark" color="red.500" bg="bg.error" px="2" py="3">
        Welcome
      </Box>

      <Box asChild bg={isRed ? "red.200" : "blue.200"}>
        <button>
          <TimeStamp />
        </button>
      </Box>

      <Box>
        <Button onClick={() => setIsRed(!isRed)}>Re-Render</Button>
      </Box>
    </Stack>
  )
}
