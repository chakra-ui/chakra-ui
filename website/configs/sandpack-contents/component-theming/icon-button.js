module.exports = {
  App: `import {
  ChakraProvider,
  IconButton,
  Box,
  useColorMode,
  SimpleGrid,
  Icon
} from "@chakra-ui/react";
import * as React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import {
  FaSun,
  FaMoon,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaTelegram
} from "react-icons/fa";

import { theme } from "./theme";

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Box position="relative" h="100vh">
      <SimpleGrid gap={12} p={12} columns={2}>
        <IconButton
          variant="outline"
          aria-label="Twitter icon"
          icon={<Icon as={FaTwitter} />}
        />
        <IconButton
          variant="solid"
          aria-label="Facebook icon"
          icon={<Icon as={FaFacebook} />}
        />

        <IconButton
          variant="ghost"
          size="xl"
          colorScheme="whatsapp"
          aria-label="WhatsApp icon"
          icon={<Icon as={FaWhatsapp} />}
        />

        <IconButton
          size="xl"
          variant="link"
          colorScheme="telegram"
          aria-label="WhatsApp icon"
          icon={<Icon as={FaTelegram} />}
        />

        <IconButton
          size="xl"
          variant="customIconButton"
          aria-label="Color mode icon"
          icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
        />
      </SimpleGrid>

      <IconButton
        variant="solid"
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
import { buttonTheme } from "./theme/components/IconButton";

const theme = extendTheme({
  components: {
    Button: buttonTheme,
  }
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);`,
  IconButtonTheme: `import { defineStyle, defineStyleConfig, transform } from "@chakra-ui/react";

const outline = defineStyle({
  color: "white",
  background: "blue.400",
  borderColor: "blue.400",
  borderRadius: "full",

  _hover: {
    background: "blue.500",
    borderColor: "blue.500"
  },

  _active: {
    background: "blue.500",
    borderColor: "blue.500"
  }
});

const solid = defineStyle({
  background: "gray.200",

  // Let's add values for dark mode
  _dark: {
    color: "white",
    background: "gray.600"
  }
});

const ghost = defineStyle({
  fontSize: "30px",
  border: "1px dashed",
  borderColor: "green.200"
});

const link = defineStyle({
  fontSize: "30px",

  _hover: {
    transform: "scale(1.1)",
    color: "blue.600"
  },

  _active: {
    color: "blue.800"
  }
});

const customIconButton = defineStyle({
  borderRadius: "full",
  background: "gray.100",
  height: "40px",
  width: "40px",
  color: "yellow.400",

  _dark: {
    background: "gray.600",
    color: "whiteAlpha.900"
  }
});

const xl = defineStyle({
  fontSize: "xl",
  px: "6",
  h: "16",
  borderRadius: "md"
});

export const buttonTheme = defineStyleConfig({
  variants: { outline, solid, ghost, link, customIconButton },
  sizes: { xl }
})`,
}
