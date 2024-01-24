module.exports = {
  App: `import { Box, SimpleGrid, IconButton, Link, Text, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Box position="relative" h="100vh">
      <SimpleGrid gap={12} p={12} columns={2}>
        <Link textDecoration={"underline"} href="https://chakra-ui.com">
          themed underline link
        </Link>
        <Link href="https://chakra-ui.com" isExternal>
          themed external link <ExternalLinkIcon mx="2px" />
        </Link>
        <Text>
          Themed Link{" "}
          <Link href="https://chakra-ui.com">
            with inline text
          </Link>
        </Text>
        <Link href="https://chakra-ui.com" variant="custom">
          themed link with custom variant
        </Link>
        <Link href="https://chakra-ui.com" size="xl">
          link size xl
        </Link>
      </SimpleGrid>

      <IconButton
        rounded="full"
        aria-label="change theme"
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
import { linkTheme } from "./theme/components/Link";

const theme = extendTheme({
  components: {
    Link: linkTheme,
  }
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);`,
  LinkTheme: `import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"

const baseStyle = defineStyle({
  fontWeight: "normal", // change the font weight to normal
  fontFamily: "mono", // change the font family to monospaced
  textColor:  "purple.500", // change the text color to purple
  textTransform:'capitalize'
})

const sizes = {
  xl: defineStyle({
    fontSize: "xl", // Change font size to sm (20px),
  }),
}


// Defining a custom variant
const customVariant = defineStyle((props) => {
  const { colorScheme: c } = props
  return {
    fontFamily: "sans-serif",
    color: 'white',
    transition: 'transform 0.15s ease-out, fontWeight 0.15s ease-out',
    _dark: {
      color: \`\${c}.500\`,
    },

    _hover: {
      transform: "scale(1.05, 1.05)",
      fontWeight: "semibold",
      textDecorationStyle: "wavy",
      _dark: {
        color: \`\${c}.500\`,
      },
    },

  }
})

export const linkTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants: {
    custom: customVariant,
  }
})`,
}
