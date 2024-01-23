module.exports = {
  App: `import { Box, IconButton, Center, Tag, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Box position="relative">
      <Center h="100vh">
        <Tag>Default</Tag>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Tag variant="brand">Branded</Tag>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Tag variant="thick">Thick</Tag>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Tag size="ml">XL Tag</Tag>
      </Center>
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
import { tagTheme } from "./theme/components/Tag";
const theme = extendTheme({
  components: {
    Tag: tagTheme
  }
});
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);`,
  TagTheme: `import { tagAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const {
  definePartsStyle,
  defineMultiStyleConfig
} = createMultiStyleConfigHelpers(tagAnatomy.keys);

const brandPrimary = definePartsStyle({
  container: {
    bg: "orange.400",
    color: "blackAlpha.700"
  }
});

const thick = definePartsStyle({
  container: {
    px: "4",
    py: "2",
    bg: "blue.400"
  }
});

const ml = defineStyle({
  px: "3",
  py: "2",
  fontSize: "25"
});

const sizes = {
  ml: definePartsStyle({ container: ml, label: ml })
};

export const tagTheme = defineMultiStyleConfig({
  sizes,
  variants: {
    brand: brandPrimary,
    thick: thick
  }
});`,
}
