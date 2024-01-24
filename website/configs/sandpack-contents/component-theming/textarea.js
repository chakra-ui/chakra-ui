module.exports = {
  App: `import { Box, SimpleGrid, IconButton, Textarea, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box position="relative" h="100vh">
      <SimpleGrid gap={12} p={12} columns={2}>
        <Textarea variant="flushed" placeholder="Flushed variant" />
        <Textarea variant="filled" placeholder="Filled variant" />
        <Textarea variant="outline" placeholder="Outlined variant" />
        <Textarea variant="brandPrimary" placeholder="Custom variant" />
      </SimpleGrid>

      <IconButton
        aria-label="toggle theme"
        rounded="full"
        size="xs"
        position="absolute"
        bottom={4}
        left={4}
        onClick={toggleColorMode}
        icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
      />
    </Box>
  );
}`,
  Index: `import * as React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import App from "./App";
import { textareaTheme } from "./theme/components/Textarea";

const theme = extendTheme({
  components: {
    Textarea: textareaTheme,
  }
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);`,
  TextareaTheme: `import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle({
  borderRadius: 0,
  fontWeight: "normal",
  border: "2px solid"
});

const outline = defineStyle({
  border: "2px dashed",
  borderColor: "purple.500"
});

const filled = defineStyle({
  borderColor: "purple.500"
});

const flushed = defineStyle({
  borderColor: "purple.500"
});

const brandPrimary = defineStyle({
  borderColor: "purple.300",
  background: "purple.50",
  fontSize: "lg",
  _focus: {
    borderColor: "purple.500"
  },
  _dark: {
    background: "purple.900",
  }
});
  
export const textareaTheme = defineStyleConfig({
  baseStyle,
  variants: { outline, filled, flushed, brandPrimary }
});
  `,
}
