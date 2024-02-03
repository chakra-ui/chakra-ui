module.exports = {
  App: `import {
  Text,
  Box,
  Flex,
  Skeleton,
  Button,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useState } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box pos="relative" height="100vh">
      <Flex textAlign="center" gap={6} p={8} direction="column">
        <Box>
          <Skeleton p={0.5} borderRadius="md" bg="teal.500" isLoaded={!isLoading}  fadeDuration={1}>
            <Text color="teal.100" fontWeight="500">Default Skeleton</Text>
          </Skeleton>
        </Box>

        <Box>
          <Skeleton
            isLoaded={!isLoading}
            bg='green.500'
            fadeDuration={1.5}
            size="xl"
            borderRadius="sm"
            p={2}
          >
            <Text color="green.100" fontWeight="500">Custom size</Text>
          </Skeleton>
        </Box>

        <Box>
          <Skeleton
            isLoaded={!isLoading}
            fadeDuration={2}
            variant="red"
            background='red.500'
            borderRadius="xl"
          >
            <Text color="red.100" fontWeight={500}>Custom red variant</Text>
          </Skeleton>
        </Box>

        <Box>
          <Button
            colorScheme="gray"
            variant="outline"
            onClick={() => setIsLoading(!isLoading)}
          >
            Toggle loading state
          </Button>
        </Box>
      </Flex>
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
  import { skeletonTheme } from "./theme/components/Skeleton";
  
  const theme = extendTheme({
    components: {
      Skeleton: skeletonTheme,
    }
  });
  
  const container = document.getElementById("root");
  const root = createRoot(container!);
  root.render(
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  );`,
  SkeletonTheme: `import {
  cssVar,
  defineStyle,
  defineStyleConfig,
} from "@chakra-ui/styled-system";

const $startColor = cssVar("skeleton-start-color");
const $endColor = cssVar("skeleton-end-color");

const red = defineStyle({
  _light: {
    [$startColor.variable]: "colors.red.100", //changing startColor to red.100
    [$endColor.variable]: "colors.red.400", // changing endColor to red.400
  },
  _dark: {
    [$startColor.variable]: "colors.red.800", //changing startColor to red.800
    [$endColor.variable]: "colors.red.600", // changing endColor to red.600
  },
});

const xl = defineStyle({
  h: 9,
  borderRadius: "lg",
});

export const skeletonTheme = defineStyleConfig({
  variants: { red },
  sizes: { xl },
});`,
}
