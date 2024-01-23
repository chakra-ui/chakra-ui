module.exports = {
  App: `import { useColorMode,IconButton, StatGroup, Box, Stat, StatArrow, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Box position="relative" h="100vh" p={12}>
        <StatGroup gap={12}>
            <Stat variant="great">
              <StatLabel>Sent</StatLabel>
              <StatNumber>345,670</StatNumber>
              <StatHelpText>
                <StatArrow type='increase' />
                23.36%
              </StatHelpText>
            </Stat>

            <Stat variant="danger">
              <StatLabel>Clicked</StatLabel>
              <StatNumber>45</StatNumber>
              <StatHelpText>
                <StatArrow type='decrease' />
                9.05%
              </StatHelpText>
            </Stat>
        </StatGroup>

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
  Index: `import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import App from "./App";
import { statTheme } from "./theme/components/Stat";

const theme = extendTheme({
  components: {
    Stat: statTheme,
  }
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);`,
  StatTheme: `import { statAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
createMultiStyleConfigHelpers(statAnatomy.keys)

const danger = definePartsStyle({
  container: {
    borderRadius: "lg",
    border: "2px solid",
    borderColor: "red.100",
    p: 1
  },
  helpText: {
    fontWeight: "bold"
  },
  label: {
    color: "red.500"
  },
  number: {
    fontStyle: "italic",
    color: "red.400"
  }
})

const great =  definePartsStyle({
  container: {
    borderRadius: "lg",
    border: "2px solid",
    borderColor: "yellow.500",
    p: 1,
  },
  helpText: {
    fontWeight: "bold"
  },
  label: {
    color: "yellow.500"
  },
  number: {
    fontStyle: "italic",
    color: "yellow.500"
  },
})

export const statTheme = defineMultiStyleConfig({
  variants: { danger , great},
})`,
}
