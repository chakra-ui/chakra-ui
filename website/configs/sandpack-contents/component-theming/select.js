module.exports = {
  App: `import {
  Box,
  IconButton,
  Select,
  SimpleGrid,
  useColorMode,
  Text
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box position="relative" h="100vh">
      <SimpleGrid gap={12} p={12} columns={2}>
        <Select variant="outline" placeholder="Themed outline select">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <Select icon={<MdArrowDropDown />} variant="filled" placeholder="Themed filled select">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <Select variant="flushed" placeholder="Themed flushed select">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <Select variant="brandPrimary" placeholder="Custom variant select">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
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
import { selectTheme } from "./theme/components/Select";
const theme = extendTheme({
  components: {
    Select: selectTheme,
  }
});
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);`,
  SelectTheme: `import { selectAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const {
  definePartsStyle,
  defineMultiStyleConfig
} = createMultiStyleConfigHelpers(selectAnatomy.keys);

const outline = definePartsStyle({
  field: {
    fontFamily: "mono",
    fontWeight: "bold",
    borderRadius: 0,
    borderColor: "purple.100",

    _focusWithin: {
      ringColor: "purple.200",
      ring: "2px",
      ringOffset: "1px",
      ringOffsetColor: "purple.100",
      borderColor: "purple.50"
    }
  }
});

const filled = definePartsStyle({
  field: {
    background: "gray.300",
    _dark: {
      background: "gray.600"
    }
  },
  icon: {
    color: "gray.800",
    _dark: {
      color: "gray.200"
    }
  }
});

const flushed = definePartsStyle({
  field: {
    borderBottom: "1px dashed",
    borderColor: "purple.300"
  },
  icon: {
    fontSize: "6xl"
  }
});

const brandPrimary = definePartsStyle({
  field: {
    background: "purple.100",
    border: "1px dashed",
    borderColor: "purple.200",
    borderRadius: "full",
    _dark: {
      background: "purple.600",
    }
  },
  icon: {
    color: "purple.400"
  }
});

const xl = defineStyle({
  fontSize: "lg",
  px: "2",
  h: "12"
});

const sizes = {
  xl: definePartsStyle({ field: xl })
};

export const selectTheme = defineMultiStyleConfig({
  variants: { brandPrimary, outline, filled, flushed },
  sizes
});`,
}
