module.exports = {
  App: `import { Box, SimpleGrid, IconButton, Checkbox, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Box position="relative">
      <SimpleGrid gap={12} p={12} columns={2}>
        <Checkbox>Themed Checkbox</Checkbox>
        <Checkbox size="xl">Themed XL Checkbox</Checkbox>
        <Checkbox variant="circular">Themed Circular Checkbox</Checkbox>
        <Checkbox variant="circular" size="xl">Themed XL Circular Checkbox</Checkbox>
        <Checkbox variant="circular" size="xl" colorScheme="red">Themed Red XL Circular Checkbox</Checkbox>
      </SimpleGrid>

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
  );
}`,
  Index: `import * as React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import App from "./App";
import { checkboxTheme } from "./theme/components/Checkbox";

const theme = extendTheme({
  components: {
    Checkbox: checkboxTheme,
  }
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);`,
  CheckboxTheme: `import { checkboxAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

// default base style from the Checkbox theme
const baseStyle = definePartsStyle({
  label: {
    fontFamily: "mono"
  },
  control: {
    padding: 3,
    borderRadius: 0
  }
})

// Defining a custom variant
const variantCircular = definePartsStyle({
  control: defineStyle({
    rounded: "full"
  })
})

const variants = {
  circular: variantCircular,
}

const sizes = {
  xl: definePartsStyle({
    control: defineStyle({
      boxSize: 14
    }),
    label: defineStyle({
      fontSize: "2xl",
      marginLeft: 6
    })
  })
}

export const checkboxTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
})`,
}
