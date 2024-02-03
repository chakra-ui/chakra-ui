module.exports = {
  App: `import {
  Badge,
  Box, HStack, IconButton, useColorMode
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box position="relative" h="100vh">
      <HStack spacing={8} p={12}>
          <Badge >Themed subtle badge</Badge>
          <Badge variant='solid'>Themed solid badge</Badge>
          <Badge variant='outline'>Themed outline badge</Badge>
      </HStack>
      <HStack spacing={8} p={12}>
          <Badge variant='custom'>Themed custom badge</Badge>
          <Badge size='xl'>XL Badge</Badge>
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
import { badgeTheme } from "./theme/components/Badge";
const theme = extendTheme({
  components: {
    Badge: badgeTheme,
  }
});
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);`,
  BadgeTheme: `import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
  borderRadius: 0, // disable the border radius
})

const sizes = {
    xl: defineStyle({
        fontSize: 'xl'
    })
}

const customVariant = defineStyle((props) => {
    const { colorScheme: c } = props
    return {
      borderRadius: 'xl',
      bg: \`\${c}.500\`,
      _dark: {
        bg: \`\${c}.300\`,
      },
    }
})

export const badgeTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants: {
    custom: customVariant,
  },
  defaultProps: {
    colorScheme: "green", // set the default color scheme to green
  },
})`,
}
