import {
  ChakraProvider,
  extendTheme,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
  theme,
  withDefaultColorScheme
} from "@chakra-ui/react"
import { StoryContext } from "@storybook/react"
import * as React from "react"
import { FaMoon, FaSun } from "react-icons/fa"
import { withPerformance } from "storybook-addon-performance"

/**
 * Add global context for RTL-LTR switching
 */
export const globalTypes = {
  direction: {
    name: "Direction",
    description: "Direction for layout",
    defaultValue: "LTR",
    toolbar: {
      icon: "globe",
      items: ["LTR", "RTL"],
    },
  },
  theme: {
    name: 'Theme',
    description: 'Theme selector',
    toolbar: {
      // https://storybook.js.org/docs/react/workflows/faq#what-icons-are-available-for-my-toolbar-or-my-addon
      icon: 'component',
      items: [

        { value: 'black', title: 'Black' },
        { value: 'white', title: 'White' },
        { value: 'gray', title: 'Gray' },
        { value: 'orange', title: 'orange' },
        { value: 'yellow', title: 'yellow' },
        { value: 'green', title: 'green' },
        { value: 'teal', title: 'Teal', right: 'default' },
        { value: 'blue', title: 'blue' },
        { value: 'cyan', title: 'cyan' },
        { value: 'purple', title: 'purple' },
        { value: 'pink', title: 'pink' },
        { value: 'telegram', title: 'Telegram' },
        { value: 'messenger', title: 'Messenger' },
        { value: 'facebook', title: 'Facebook' },
      ],
    },
  },
}

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

const withChakra = (StoryFn: Function, context: StoryContext) => {
  const { direction, theme } = context.globals;
  const dir = direction.toLowerCase()

  React.useEffect(() => {
    document.documentElement.dir = dir
  }, [dir])

  return (
    <ChakraProvider theme={extendTheme({
      direction: dir,
      }, withDefaultColorScheme({ colorScheme: theme || 'teal' }),)}>
      <div dir={dir} id="story-wrapper" style={{ minHeight: "100vh" }}>
        <ColorModeToggleBar />
        <StoryFn />
      </div>
    </ChakraProvider>
  )
}

export const decorators = [withChakra, withPerformance]
