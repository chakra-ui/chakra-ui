import * as React from "react"
import { Text } from "../Text"
import { Box } from "../Box"
import theme from "@chakra-ui/preset-base"
import { ThemeProvider } from "@chakra-ui/system"

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
  title: "Text",
}

export const Basic = () => <Text>Kame-hame-ha!</Text>

const examples = [
  <Text isBaselineCropped>Basic Crop</Text>,
  <Text isBaselineCropped lineHeight={1.5}>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos vel ab dolore
    eius mollitia culpa pariatur maxime, tempora in molestias aspernatur
    consectetur fuga, officiis beatae, sequi incidunt officia voluptatem
    tenetur.
  </Text>,
  <Text isBaselineCropped isTruncated>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos vel ab dolore
    eius mollitia culpa pariatur maxime, tempora in molestias aspernatur
    consectetur fuga, officiis beatae, sequi incidunt officia voluptatem
    tenetur.
  </Text>,
  <Text
    isBaselineCropped
    lineHeight={{ sm: 1, lg: 2 }}
    fontFamily={["body", "mono"]}
  >
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos vel ab dolore
    eius mollitia culpa pariatur maxime, tempora in molestias aspernatur
    consectetur fuga, officiis beatae, sequi incidunt officia voluptatem
    tenetur.
  </Text>,
]

export const BaselineCrop = () => (
  <ThemeProvider theme={myTheme}>
    <Box maxW="containers.sm" mx="auto">
      {examples.map(example => {
        return (
          <Box mb="6">
            <Box height="10px" width="100%" bg="green.800" />
            {example}
            <Box height="10px" width="100%" bg="green.800" />
          </Box>
        )
      })}
    </Box>
  </ThemeProvider>
)
