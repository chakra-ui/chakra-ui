import {
  ChakraProvider,
  useColorMode,
  useColorModeValue,
  Flex,
  IconButton,
} from "@chakra-ui/core"
import { FaMoon, FaSun } from "react-icons/fa"
import { addDecorator } from "@storybook/react"
import * as React from "react"
import { withPerformance } from "storybook-addon-performance"
import { withA11y } from "@storybook/addon-a11y"

const ColorModeToggleBar = () => {
  const { toggleColorMode } = useColorMode()
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const nextMode = useColorModeValue("dark", "light")

  return (
    <Flex justify="flex-end" mb={4}>
      <IconButton
        size="md"
        fontSize="lg"
        aria-label={`Switch to ${nextMode} mode`}
        variant="ghost"
        color="current"
        marginLeft="2"
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
      />
    </Flex>
  )
}

const withChakra = (StoryFn: Function) => (
  <ChakraProvider resetCSS>
    <div id="story-wrapper" style={{ minHeight: "100vh" }}>
      <ColorModeToggleBar />
      <StoryFn />
    </div>
  </ChakraProvider>
)

addDecorator(withChakra)
addDecorator(withPerformance)
addDecorator(withA11y)
