module.exports = {
  App: `import {
  Box,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  useColorMode,
  Text
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box position="relative" h="100vh">
      <SimpleGrid gap={12} p={12} columns={2}>
        <Box>
          <Text fontSize="sm">Themed filled number input:</Text>
          <NumberInput variant="filled">
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
        <Box>
          <Text fontSize="sm">Themed outline number input:</Text>
          <NumberInput variant="outline">
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
        <Box>
          <Text fontSize="sm">Themed flushed number input:</Text>
          <NumberInput variant="flushed">
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
        <Box>
          <Text fontSize="sm">Custom variant number input:</Text>
          <NumberInput variant="primary">
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
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
import { numberInputTheme } from "./theme/components/NumberInput";
const theme = extendTheme({
  components: {
    NumberInput: numberInputTheme,
  }
});
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);`,
  NumberInputTheme: `import { numberInputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const {
  definePartsStyle,
  defineMultiStyleConfig
} = createMultiStyleConfigHelpers(numberInputAnatomy.keys);

const filled = definePartsStyle({
  field: {
    borderRadius: 0,
    borderColor: "purple.200"
  },
  stepper: {
    color: "purple.500",
    borderColor: "purple.200",

    // Let's also provide dark mode alternatives
    _dark: {
      color: "purple.400"
    }
  }
});

const outline = definePartsStyle({
  field: {
    border: 0,
    _focus: {
      ring: "1px",
      ringColor: "purple.300",
      ringOffset: "2px",
      ringOffsetColor: "purple.200"
    }
  }
});

const flushed = definePartsStyle({
  stepper: {
    _active: {
      color: "green.300"
    },
    _odd: {
      background: "green.200"
    },
    _even: {
      background: "red.200"
    }
  }
});

const primary = definePartsStyle({
  field: {
    border: "1px solid",
    borderColor: "gray.200",
    background: "gray.50",
    fontWeight: "bold",

    // Let's also provide dark mode alternatives
    _dark: {
      borderColor: "gray.600",
      background: "gray.800"
    }
  },
  stepper: {
    color: "purple.500",
    background: "gray.200"
  }
});

export const numberInputTheme = defineMultiStyleConfig({
  variants: { primary, filled, outline, flushed }
});`,
}
