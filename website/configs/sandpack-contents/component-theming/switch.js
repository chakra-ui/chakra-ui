module.exports = {
  App: `import {
  Box, HStack, IconButton, Switch, useColorMode
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box position="relative" h="100vh">
      <HStack spacing={8} p={12}>
        <Switch size="sm" />
        <Switch size="md" />
        <Switch size="lg" />
        <Switch size="sm" colorScheme='red' />
        <Switch size="md" colorScheme='green' />
        <Switch size="lg" colorScheme='purple' />
        <Switch variant="boxy" colorScheme='yellow' />
      </HStack>
      <IconButton
        aria-label="toggle theme"
        rounded="full"
        size="xs"
        position="absolute"
        bottom={4}
        left={4}
        onClick={toggleColorMode} icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
      />
    </Box>
  )
}`,
  Index: `import * as React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App";
import { switchTheme } from "./theme/components/Switch.ts";
const theme = extendTheme({
  components: {
    Switch: switchTheme,
  }
});
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);`,
  SwitchTheme: `import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys)

const baseStyleTrack = defineStyle((props) => {
  const { colorScheme: c } = props

  return {
    bg: \`\${c}.200\`,
    _checked: {
      bg: \`\${c}.200\`,
    },
    _dark: {
      bg: \`\${c}.900\`,
      _checked: {
        bg: \`\${c}.900\`,
      }
    },
  }
})

const baseStyle = definePartsStyle((props) => ({
  // define the part you're going to style
  container: {
    // ...
  },
  thumb: {
    bg: "gray.100",
    // let's also provide dark mode alternatives
    _dark: {
      bg: 'gray.900',
    },
  },
  track: baseStyleTrack(props)
}))

const boxy = definePartsStyle({
  track: {
    borderRadius: 'sm',
    p: 1,
  }
})

export const switchTheme = defineMultiStyleConfig({ baseStyle, variants: { boxy }})`,
}
