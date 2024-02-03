module.exports = {
  App: `import {
  Box,
  useColorMode,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  IconButton,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box pt={12} position="relative" h="100vh">
      <Accordion>
        <AccordionItem m={4}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Section 1 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem m={4}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Section 2 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

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
}
`,
  Index: `import * as React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import App from "./App";
import { accordionTheme } from "./theme/components/Accordion";

const theme = extendTheme({
  components: {
    Accordion: accordionTheme,
  }
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);`,
  AccordionTheme: `import { accordionAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";
import { extendTheme } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

// default base style from the Input theme
const baseStyle = definePartsStyle({
  container: defineStyle({
    boxShadow: "sm",
    _focus: {
      boxShadow: "outline",
    },
  }),
});

// Defining a custom variant called outline
const outline = definePartsStyle((props) => {
  const { colorScheme: c } = props;
  return {
    container: {
      border: "1px solid",
      borderColor: "gray.100",
    },
    button: {
      color: "gray.500",
      _hover: {
        color: "gray.600",
      },
      _focus: {
        color: "blue.500",
      },
      fontFamily: "mono",
    },
  };
});

const variants = {
  outline,
};

const size = {
  md: defineStyle({
    w: 5,
    h: 5,
  }),
};

const sizes = {
  md: definePartsStyle({
    icon: size.md,
  }),
};

export const accordionTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    size: "md",
    variant: "outline",
  },
});`,
}
