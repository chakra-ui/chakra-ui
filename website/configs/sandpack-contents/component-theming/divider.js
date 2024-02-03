module.exports = {
  App: `import { Box, SimpleGrid, IconButton, Center, Divider, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
export default function App() {
    const { toggleColorMode, colorMode } = useColorMode();
    return (
        <Box position="relative" h="100vh">
            <SimpleGrid gap={12} p={12} columns={2}>
              <Divider variant="thick" />
              <Center height="50px">
                <Divider orientation="vertical" variant="thick" />
              </Center>
              <Divider variant="brand" />
              <Center height="50px">
                <Divider orientation="vertical" variant="brand" />
              </Center>
              <Divider size="xl" />
              <Center height="50px">
                <Divider orientation="vertical" size="xl" />
              </Center>
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
import { dividerTheme } from "./theme/components/Divider";
const theme = extendTheme({
    components: {
        Divider: dividerTheme,
    }
});
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
    <ChakraProvider theme={theme}>
        <App />
    </ChakraProvider>
);`,
  DividerTheme: `import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"

const brandPrimary = defineStyle({
    borderWidth: '3px',
    borderStyle: 'dashed',
    borderColor: 'orange.500',

    // let's also provide dark mode alternatives
    _dark: {
        borderColor: 'orange.300',
    }
})

const xl = defineStyle({
    borderWidth: "10px",
    borderStyle: "solid",
    borderRadius: 20,
})

const thick = defineStyle({
    borderWidth: '5px', // change the appearance of the border
    borderStyle: "solid",
    borderRadius: 10, // set border radius to 10
    borderColor: "orange.500",
    _dark: {
      borderColor: "orange.300",
    }
})

export const dividerTheme = defineStyleConfig({
    thick,
    sizes: {
        "xl": xl
    },
    variants: {
        brand: brandPrimary,
        "thick": thick
    },
})`,
}
