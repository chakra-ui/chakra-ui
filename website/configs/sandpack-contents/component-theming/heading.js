module.exports = {
  App: `import { Box, SimpleGrid, IconButton, Heading, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
export default function App() {
    const { toggleColorMode, colorMode } = useColorMode();
    return (
        <Box position="relative" h="100vh">
            <SimpleGrid gap={12} p={12} columns={2}>
              <Heading>Default heading</Heading>
              <Heading variant="custom">Themed heading</Heading>
              <Heading variant="brand">Branded heading</Heading>
              <Heading variant="underline">Underlined heading</Heading>
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
import { headingTheme } from "./theme/components/Heading";
const theme = extendTheme({
    components: {
        Heading: headingTheme,
    }
});
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
    <ChakraProvider theme={theme}>
        <App />
    </ChakraProvider>
);`,
  HeadingTheme: `import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"
const brandPrimary = defineStyle({
    color: "blue.500",
    // let's also provide dark mode alternatives
    _dark: {
        color: 'blue.300',
    }
})

const custom = defineStyle({
    color: "yellow.500",
    fontFamily: "mono",
    fontWeight: "semibold",
    // let's also provide dark mode alternatives
    _dark: {
        color: 'yellow.300',
    }
})

const underline = defineStyle({
    color: "orange.500",
    borderBottom: "2px",
    borderRadius: "10",
    fontFamily: "serif",
    // let's also provide dark mode alternatives
    _dark: {
        color: 'orange.400',
    },
    _hover: {
        borderColor: "red.200",
        _dark: {
            borderColor: "red.300"
        }
    }
})

export const headingTheme = defineStyleConfig({
    variants: {
        brand: brandPrimary,
        "custom": custom,
        "underline": underline
    },
})`,
}
