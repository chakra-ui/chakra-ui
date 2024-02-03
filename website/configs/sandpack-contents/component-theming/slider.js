module.exports = {
  App: `import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Text,
  Box,
  Flex,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <>
      <Flex h={"100vh"} textAlign="center" gap={5} p={8} direction="column">
        <Box display="flex" gap={3} flexDirection="column">
          <Text fontSize="lg">Default variant</Text>
          <Slider aria-label="slider-ex-1">
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>

        <Box display="flex" gap={3} flexDirection="column">
          <Text fontSize="lg">Custom size</Text>
          <Slider aria-label="slider-ex-1" size="xl">
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>

        <Box display="flex" gap={3} flexDirection="column">
          <Text fontSize="lg">Square variant</Text>
          <Slider aria-label="slider-ex-1" variant="square">
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>

        <Box display="flex" gap={3} flexDirection="column">
        <Text fontSize="lg">Custom variant with markers</Text>
        <Slider aria-label="slider-ex-1" variant="colorful" onChange={(val) => setSliderValue(val)}>
          <SliderMark value={sliderValue}>
            {sliderValue}%
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>

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
      </Flex>
    </>
  );
}`,
  Index: `import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { extendTheme } from "@chakra-ui/react";
import { sliderTheme } from "./theme/components/Slider";
export const theme = extendTheme({
  components: { Slider: sliderTheme }
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
  SliderTheme: `import { sliderAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";
import { mode } from "@chakra-ui/theme-tools";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle((props) => ({
  filledTrack: {
    bg: mode("blue.400", "blue.300")(props),
  },
  thumb: {
    bg: mode("white", "gray.200")(props),
    _hover: {
      bg: mode("gray.100", "gray.300")(props),
    },
  },
}));

const sizes = {
  xl: definePartsStyle({
    track: defineStyle({
      h: 7,
    }),
    thumb: defineStyle({
      boxSize: 7,
    }),
  }),
};

const square = definePartsStyle({
  thumb: defineStyle({
    rounded: "none",
  }),
});

const colorful = definePartsStyle((props) => ({
  filledTrack: {
    bg: 'blue.500',
  },
  track: {
    bg: mode("blue.100", "blue.900")(props),
  },
  thumb: {
    bg: 'blue.200',
  },
  mark: {
    textAlign: 'center',
    bg: 'blue.500',
    color: 'white',
    mt: '4',
    ml: '-5',
    w: '12',
  }
}));

export const sliderTheme = defineMultiStyleConfig({
  baseStyle,
  variants: { square, colorful },
  sizes,
});`,
}
