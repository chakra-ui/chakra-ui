module.exports = {
  App: `import { Box, HStack, IconButton, Avatar, AvatarBadge, AvatarGroup, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Box position="relative" h="100vh">
      <HStack spacing={8} p={12}>
        <Avatar name="Segun Adebayo" />
        <Avatar name="Lazar Nikolov" variant="roundedSquare">
          <AvatarBadge boxSize="1rem" />
        </Avatar>
        <AvatarGroup max={2} size="superLg" variant="roundedSquare">
          <Avatar name="Lazar Nikolov" variant="roundedSquare">
            <AvatarBadge />
          </Avatar>
          <Avatar name="Segun Adebayo" variant="roundedSquare">
            <AvatarBadge bg="orange.500" />
          </Avatar>
          <Avatar name="Segun Adebayo" variant="roundedSquare">
            <AvatarBadge bg="orange.500" />
          </Avatar>
        </AvatarGroup>
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
  );
}`,
  Index: `import * as React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import App from "./App";
import { avatarTheme } from "./theme/components/Avatar";

const theme = extendTheme({
  components: {
    Avatar: avatarTheme,
  }
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);`,
  AvatarTheme: `import { avatarAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  badge: {
    bg: "gray.500",
    border: "2px solid"
  },
  excessLabel: {
    bg: "gray.800",
    color: "white",
    border: "2px solid",

    // let's also provide dark mode alternatives
    _dark: {
      bg: 'gray.400',
      color: 'gray.900',
    }
  }
})

// Defining a custom variant
const variantRoundedSquare = definePartsStyle({
  badge: {
    bg: "gray.500",
    border: "2px solid"
  },
  container: {
    borderRadius: "0.7em",
  },
  excessLabel: {
    bg: "gray.800",
    color: "white",
    borderRadius: "0.7em",
    border: "2px solid",

    // let's also provide dark mode alternatives
    _dark: {
      bg: "gray.400",
      color: "gray.900"
    }
  }
});

const variants = {
  roundedSquare: variantRoundedSquare,
}

const superLg = defineStyle({
  width: 40,
  height: 40,
  fontSize: "6xl",
  borderWidth: "6px"
})

const sizes = {
  superLg: definePartsStyle({
    container: superLg,
    excessLabel: superLg,
    badge: {
      width: 8,
      height: 8,
      borderWidth: "6px",
    }
  }),
}

export const avatarTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
})`,
}
