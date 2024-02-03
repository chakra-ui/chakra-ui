module.exports = {
  App: `import { Box, SimpleGrid, GridItem, Icon, IconButton, Input, InputGroup, InputLeftAddon, InputRightElement, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun, FaPhone } from "react-icons/fa";

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Box position="relative" h="100vh">
      <SimpleGrid gap={12} p={12} columns={2}>
        <Input placeholder="Themed Outline Input" />
        <Input placeholder="Themed Filled Input" variant="filled" />
        <GridItem colSpan={2}>
          <InputGroup variant="custom" colorScheme="purple">
            <InputLeftAddon>Phone:</InputLeftAddon>
            <Input placeholder="Themed Custom Input" />
            <InputRightElement pointerEvents="none">
              <Icon as={FaPhone} color="green.400" />
            </InputRightElement>
          </InputGroup>
        </GridItem>
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
import { inputTheme } from "./theme/components/Input";

const theme = extendTheme({
  components: {
    Input: inputTheme,
  }
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);`,
  InputTheme: `import { inputAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

// default base style from the Input theme
const baseStyle = definePartsStyle({
  field: {
    width: "100%",
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    transitionProperty: "common",
    transitionDuration: "normal",
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
})

const variantOutline = definePartsStyle((props) => {
  return {
    field: {
      fontFamily: "mono", // change font family to mono
    }
  }
})

const variantFilled = definePartsStyle((props) => {
  return {
    field: {
      fontWeight: "semibold", // change font weight to semibold
    },
  }
})

// Defining a custom variant
const variantCustom = definePartsStyle((props) => {
  const { colorScheme: c } = props
  return {
    field: {
      border: "0px solid",
      bg: "gray.50",
      borderTopRightRadius: "full",
      borderBottomRightRadius: "full",
      _dark: {
        bg: "whiteAlpha.50"
      },

      _hover: {
        bg: "gray.200",
        _dark: {
          bg: "whiteAlpha.100"
        }
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _focusVisible: {
        bg: "gray.200",
        _dark: {
          bg: "whiteAlpha.100"
        }
      },
    },
    addon: {
      border: "0px solid",
      borderColor: "transparent",
      borderTopLeftRadius: "full",
      borderBottomLeftRadius: "full",
      bg: \`\${c}.500\`,
      color: "white",
      _dark: {
        bg: \`\${c}.300\`,
        color: \`\${c}.900\`,
      }
    },
    element: {
      bg: "white",
      rounded: "full",
      border: "1px solid",
      borderColor: "gray.100",
      _dark: {
        bg: "whiteAlpha.50",
        borderColor: "whiteAlpha.100",
      }
    },
  }
})

const variants = {
  outline: variantOutline,
  filled: variantFilled,
  custom: variantCustom,
}

const size = {
  md: defineStyle({
    fontSize: "sm",
    px: "4",
    h: "10",
    borderRadius: "none",
  }),
}

const sizes = {
  md: definePartsStyle({
    field: size.md,
    addon: size.md,
  }),
}

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    size: "md",
    variant: "outline",
  },
})`,
}
