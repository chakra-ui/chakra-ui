module.exports = {
  App: `import {
  Dialog,
  useDisclosure,
  Button,
  Box,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";


export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode, colorMode } = useColorMode();

  return (
      <Box position="relative" h="100vh" p={12}>
      <Button onClick={onOpen}>Open Dialog</Button>

      <Dialog.Root isOpen={isOpen} onClose={onClose}>
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>Dialog Title</Dialog.Header>
            <Dialog.CloseButton />
            <Dialog.Body>
              Lorem ipsum dolor sit amet. Et corporis quisquam eum adipisci
              impedit quo eius nisi est aspernatur vel veniam velit qui numquam
              totam. Vel debitis sint ut culpa cupiditate a dolores voluptates ut
              vero voluptatem non rerum aliquid qui sapiente possimus. Eum natus
              voluptates hic galisum architecto et nobis incidunt ut odio ipsum
              qui repudiandae voluptatem.
            </Dialog.Body>

            <Dialog.Footer>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
      <IconButton
        aria-label="change theme"
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
import { dialogTheme } from "./theme/components/dialog";

const theme = extendTheme({
  components: {
    Dialog: dialogTheme
  },
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);`,
  DialogTheme: `import { dialogAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle((props) => {
  const { colorScheme: c } = props;
  return {
    dialog: {
      borderRadius: "md",
      bg: \`\${c}.100\`,
      _dark: {
        bg: \`\${c}.600\`,
        color: "white",
      },
    },
  };
});

const xl = defineStyle({
  px: "6",
  py: "0",
  fontSize: "xl",
});

const sm = defineStyle({
  fontSize: "sm",
  py: "2",
  pt: "8",
});

const sizes = {
  xl: definePartsStyle({ header: sm, dialog: xl }),
};

export const dialogTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    colorScheme: "purple", //set the default color scheme to purple
    size: "xl",
  },
});`,
}
