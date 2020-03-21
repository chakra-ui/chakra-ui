import React from "react"
import { Box } from "../Box"
import { Stack } from "../Stack"
import { Heading } from "../Heading"
import { ThemeProvider } from "@chakra-ui/system"
import theme from "@chakra-ui/preset-base"

const myTheme = {
  ...theme,
  baselineCrop: {
    body: {
      topCrop: 10,
      bottomCrop: 9,
    },
    mono: {
      topCrop: 8.5,
      bottomCrop: 10,
    },
  },
}

export default {
  title: "Heading",
}

export function Basic() {
  return <Heading>Chakra UI</Heading>
}

export function TextCrop() {
  return (
    <ThemeProvider theme={myTheme}>
      <Stack maxW="containers.sm" mx="auto" spacing="10">
        <Box>
          <Box height="10px" bg="green.800" />
          <Heading isBaselineCropped>Chakra UI</Heading>
          <Box height="10px" bg="green.800" />
        </Box>

        <Box>
          <Box height="10px" bg="green.800" />
          <Heading isBaselineCropped lineHeight={1.5}>
            Chakra UI Chakra UI Chakra UI Chakra UI Chakra UI Chakra UI Chakra
            UI
          </Heading>
          <Box height="10px" bg="green.800" />
        </Box>

        <Box>
          <Box height="10px" bg="green.800" />
          <Heading isBaselineCropped isTruncated>
            Chakra UI Chakra UI Chakra UI Chakra UI Chakra UI Chakra UI Chakra
            UI
          </Heading>
          <Box height="10px" bg="green.800" />
        </Box>
      </Stack>
    </ThemeProvider>
  )
}
