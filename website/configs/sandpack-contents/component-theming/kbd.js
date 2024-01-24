module.exports = {
  App: `import {
  Kbd,
  Box, HStack, IconButton, useColorMode
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box position="relative" h="100vh">
      <HStack spacing={8} p={8}>
        <p>Default style: &nbsp; 
          <Kbd>command</Kbd> + <Kbd>shift</Kbd>
        </p>
      </HStack>
      <HStack spacing={8} p={8}>
          <p>Themed solid kbd: &nbsp;
            <Kbd variant='solid'>command</Kbd> + <Kbd variant='solid'>shift</Kbd>
          </p>
          <p>Themed outline kbd: &nbsp;
            <Kbd variant='outline'>command</Kbd> + <Kbd variant='outline'>shift</Kbd>
          </p>
      </HStack>
      <HStack spacing={8} p={8}>
          <p>Themed custom kbd: &nbsp;
            <Kbd variant='custom'>command</Kbd> + <Kbd variant='custom'>shift</Kbd>
          </p>
          <p>XL Kbd: &nbsp;
            <Kbd size='xl'>command</Kbd> + <Kbd size='xl'>shift</Kbd>
          </p>
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
import { kbdTheme } from "./theme/components/Kbd";
const theme = extendTheme({
  components: {
    Kbd: kbdTheme,
  }
});
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);`,
  KbdTheme: `import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
  borderRadius: 0, // disable the border radius
})

const sizes = {
    xl: defineStyle({
        fontSize: 'xl'
    })
}

const solidVariant = defineStyle((props) => {
  const { colorScheme: c } = props
  return {
    color: 'white',
    background: \`\${c}.500\`,
    borderColor: \`\${c}.900\`,
    _dark: {
        background: \`\${c}.300\`,
      },
  }
})

const outlineVariant = defineStyle((props) => {
  const { colorScheme: c } = props
  return {
    color: 'white',
    border: "2px dashed",
    background: \`\${c}.500\`,
    borderColor: \`\${c}.900\`,
    _dark: {
      background: \`\${c}.300\`,
    },
  }
})

const customVariant = defineStyle((props) => {
    const { colorScheme: c } = props
    return {
      color: 'white',
      borderRadius: 'xl',
      background: \`\${c}.500\`,
      _dark: {
        background: \`\${c}.300\`,
      },
    }
})

export const kbdTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants: {
    custom: customVariant,
    solid: solidVariant,
    outline: outlineVariant
  },
  defaultProps: {
    colorScheme: "blue", // set the default color scheme to green
  },
})`,
}
