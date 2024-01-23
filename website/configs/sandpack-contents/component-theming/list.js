module.exports = {
  App: `import {
  Box,
  IconButton,
  List,
  ListIcon,
  ListItem,
  OrderedList,
  UnorderedList,
  useColorMode,
  Text,
  SimpleGrid,
  Checkbox,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { MdCheckCircle, MdSettings, MdOutlineSell } from "react-icons/md";

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box position="relative" h="100vh">
      <SimpleGrid gap={12} p={12} columns={3}>
        <Box>
          <OrderedList p={2}>
            <ListItem>Lorem ipsum dolor sit</ListItem>
            <ListItem>Consectetur adipiscing</ListItem>
            <ListItem>Integer molestie lorem</ListItem>
          </OrderedList>
        </Box>
        <Box>
          <UnorderedList p={2}>
            <ListItem>Lorem ipsum dolor sit</ListItem>
            <ListItem>Consectetur adipiscing</ListItem>
            <ListItem>Integer molestie lorem</ListItem>
          </UnorderedList>
        </Box>
        <Box>
          <List p={2}>
            <ListItem>
              <ListIcon as={MdCheckCircle} />
              Lorem ipsum dolor sit
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} />
              Consectetur adipiscing
            </ListItem>
            <ListItem>
              <ListIcon as={MdSettings} />
              Integer molestie lorem
            </ListItem>
          </List>
        </Box>
      </SimpleGrid>

      <SimpleGrid gap={12} px={12} columns={2}>
        <Box>
          <List size="xl" variant="custom" spacing={5}>
            <ListItem>
              <Checkbox>Lorem ipsum dolor sit</Checkbox>
              <Text color="gray.400" fontSize="xs">
                Due Date: 01/01/2023
              </Text>
            </ListItem>
            <ListItem>
              <Checkbox>Lorem ipsum dolor sit</Checkbox>
              <Text color="gray.400" fontSize="xs">
                Due Date: 01/01/2023
              </Text>
            </ListItem>
            <ListItem>
              <Checkbox>Lorem ipsum dolor sit</Checkbox>
              <Text color="gray.400" fontSize="xs">
                Due Date: 01/01/2023
              </Text>
            </ListItem>
          </List>
        </Box>
        <Box>
          <List size="xl" variant="orange" spacing={3}>
            <ListItem>
              <ListIcon as={MdOutlineSell} />
              Lorem ipsum dolor sit
            </ListItem>
            <ListItem>
              <ListIcon as={MdOutlineSell} />
              Lorem ipsum dolor sit
            </ListItem>
            <ListItem>
              <ListIcon as={MdOutlineSell} />
              Lorem ipsum dolor sit
            </ListItem>
          </List>
        </Box>
      </SimpleGrid>
      <Box>
        <IconButton
          aria-label="toggle theme"
          rounded="full"
          size="xs"
          position="fixed"
          bottom={4}
          left={4}
          onClick={toggleColorMode}
          icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
        />
      </Box>
    </Box>
  );
}`,
  Index: `import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { extendTheme } from "@chakra-ui/react";
import { listTheme } from "./theme/components/List";
export const theme = extendTheme({
  components: { List: listTheme }
});
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);`,
  ListTheme: `import {
  defineStyle,
  createMultiStyleConfigHelpers,
} from "@chakra-ui/styled-system";
import { listAnatomy as parts } from "@chakra-ui/anatomy";
import { mode } from "@chakra-ui/theme-tools";
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle((props) => ({
  container: {
    listStylePos: "inside",
    margin: "0px !important",
    boxShadow: "md",
  },
  item: {
    p: 1,
    "&::marker": {
      color: mode("green.500", "green.200")(props),
    },
  },
  icon: {
    color: mode("blue.500", "blue.200")(props),
  },
}));

const sizes = {
  xl: definePartsStyle({
    container: defineStyle({
      fontSize: "xl",
      p: 6,
    }),
    icon: defineStyle({
      boxSize: 6,
      mr: 5,
    }),
  }),
};

const orange = definePartsStyle((props) => ({
  container: {
    shadow: "none",
    border: "3px",
    borderStyle: "dashed",
    borderColor: "gray.300",
  },
  item: {
    display: "flex",
    alignItems: "center",
    bg: mode("orange.100", "orange.400")(props),
    borderRadius: "full",
    w: "full",
    px: 5,
    shadow: "sm",
  },
  icon: {
    color: mode("orange.300", "orange.100")(props),
  },
}));

const custom = definePartsStyle((props) => ({
  container: {
    shadow: "none",
    display: "flex",
    flexDirection: "column",
    justify: "center",
    align: "center",
  },
  item: {
    background: mode("gray.50", "blackAlpha.100")(props),
    padding: 5,
    shadow: "xs",
    borderRadius: "lg",
  },
}));

export const listTheme = defineMultiStyleConfig({
  variants: {
    orange,
    custom,
  },
  sizes,
  baseStyle,
})`,
}
