module.exports = {
  App: `import { Box, SimpleGrid, IconButton, useColorMode, TableContainer, Table, Tr, Td, Th, Thead, Tbody, Tfoot, TableCaption, } from "@chakra-ui/react";
import { FaMoon, FaSun, FaPhone } from "react-icons/fa";

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Box position="relative" h="100vh">
      <TableContainer padding="1rem">
        <Table>
          <TableCaption placement="top">XL Size Rounded Variant Table</TableCaption>
          <Thead>
            <Tr><Th>Month</Th><Th isNumeric>Spend</Th></Tr>
          </Thead>
          <Tbody>
            <Tr><Td>January</Td><Td isNumeric>100</Td></Tr>
            <Tr><Td>February</Td><Td isNumeric>100</Td></Tr>
            <Tr><Td>March</Td><Td isNumeric>100</Td></Tr>
            <Tr><Td>April</Td><Td isNumeric>100</Td></Tr>
          </Tbody>
          <Tfoot>
            <Tr><Th>Total</Th><Th isNumeric>400</Th></Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      
      <TableContainer padding="1rem">
        <Table variant="striped" size="sm">
          <TableCaption placement="top">Size: Small, Variant: Striped</TableCaption>
          <Thead>
            <Tr><Th>Month</Th><Th isNumeric>Spend</Th></Tr>
          </Thead>
          <Tbody>
            <Tr><Td>January</Td><Td isNumeric>100</Td></Tr>
            <Tr><Td>February</Td><Td isNumeric>100</Td></Tr>
            <Tr><Td>March</Td><Td isNumeric>100</Td></Tr>
            <Tr><Td>April</Td><Td isNumeric>100</Td></Tr>
          </Tbody>
          <Tfoot>
            <Tr><Th>Total</Th><Th isNumeric>400</Th></Tr>
          </Tfoot>
        </Table>
      </TableContainer>

      <IconButton
        aria-label="toggle theme"
        rounded="full"
        size="xs"
        position="fixed"
        top={4}
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
import { tableTheme } from "./theme/components/Table";

const theme = extendTheme({
  components: {
    Table: tableTheme,
  }
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);`,
  TableTheme: `import { tableAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

// default base style from the Table theme
const baseStyle = definePartsStyle({
  table: {
    fontVariantNumeric: "lining-nums tabular-nums",
    borderCollapse: "collapse",
    width: "full",
  },
  th: {
    fontFamily: "heading",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
    textAlign: "start",
  },
  td: {
    textAlign: "start",
  },
  caption: {
    mt: 4,
    fontFamily: "heading",
    textAlign: "center",
    fontWeight: "medium",
  },
})

const variantStriped = definePartsStyle((props) => {
  return {
    td: {
      fontFamily: "mono", // change font family to mono
    }
  }
})

const variantSimple = definePartsStyle((props) => {
  return {
    td: {
      fontWeight: "semibold", // change font weight to semibold
    },
  }
})

// Defining a custom variant
const variantRounded = definePartsStyle((props) => {
  const { colorScheme: c, colorMode } = props;

  return {
    tr: {
      "td:first-child": {
        borderTopLeftRadius: "full",
        borderBottomLeftRadius: "full"
      },
      "td:last-child": {
        borderTopRightRadius: "full",
        borderBottomRightRadius: "full"
      },
    },
    th: {
      "&[data-is-numeric=true]": {
        textAlign: "end"
      }
    },
    td: {
      "&[data-is-numeric=true]": {
        textAlign: "end"
      }
    },
    caption: {
      color: colorMode === "light" ? \`\${c}.600\` : \`\${c}.100\`,
    },
    tbody: {
      tr: {
        "&:nth-of-type(odd)": {
          "th, td": {
            borderBottomWidth: "1px",
            borderColor: colorMode === "light" ? \`\${c}.100\` : \`\${c}.700\`,
          },
          td: {
            background: colorMode === "light" ? \`\${c}.100\` : \`\${c}.700\`,
          }
        },
        "&:nth-of-type(even)": {
          "th, td": {
            borderBottomWidth: "1px",
            borderColor: colorMode === "light" ? \`\${c}.300\` : \`\${c}.600\`,
          },
          td: {
            background: colorMode === "light" ? \`\${c}.300\` : \`\${c}.600\`,
          }
        }
      }
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: { borderBottomWidth: 0 }
        }
      }
    }
  };
});

const variants = {
  simple: variantSimple,
  striped: variantStriped,
  rounded: variantRounded,
}

const xl = defineStyle({
  fontSize: 'lg',
  px: '4',
  h: '12',
})

const sizes = {
  xl: definePartsStyle({
    td: xl,
    th: xl,
  }),
}

export const tableTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    size: "xl",
    variant: "rounded",
    colorScheme: "gray"
  },
})`,
}
