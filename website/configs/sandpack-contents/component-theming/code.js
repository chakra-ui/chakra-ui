module.exports = {
  App: `import { Box, Flex, IconButton, Code, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Box position="relative" h="100vh">
      <Flex wrap="wrap" gap={12} p={12}>
        <Code colorScheme="green">console.log('Themed Green Code')</Code>
        <Code variant="custom">console.log('Themed Custom Variant Code')</Code>
        <Code variant="solid">console.log('Themed Solid Variant Code')</Code>
        <Code variant="outline">
          console.log('Themed Outline Variant Code')
        </Code>
      </Flex>

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
import { codeTheme } from "./theme/components/Code";

const theme = extendTheme({
  components: {
    Code: codeTheme,
  }
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);`,
  CodeTheme: `import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const baseStyle = defineStyle({
  borderRadius: 0, // remove border radius
  paddingX: 2, // add horizontal padding
  paddingY: 1, // add vertical padding
  fontSize: "sm", // change font size to xs
  fontWeight: "normal", // change the font weight to normal
  fontFamily: "mono" // change the font family to mono
});

// Defining a custom variant
const customVariant = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    borderColor: \`\${c}.500\`,
    borderWidth: 2,
    borderStyle: "dashed",
    color: \`\${c}.500\`,
    borderRadius: "4px",
    fontSize: "md"
  };
});

export const codeTheme = defineStyleConfig({
  baseStyle,
  variants: {
    custom: customVariant
  },
  defaultProps: {
    colorScheme: "purple" // set the default color scheme to purple
  }
});`,
}
