module.exports = {
  App: `import {
  ChakraProvider,
  Box,
  Radio,
  Heading,
  VStack,
} from '@chakra-ui/react';
import theme from './theme';
import { ColorModeSwitcher } from './ColorModeSwitcher';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box position="relative" h="100vh" p={12}>
        <VStack spacing={4} alignItems="flex-start">
          <Radio>Styled Radio</Radio>
          <Radio size="xl">XL Radio</Radio>
          <Radio variant="groove">Custom Variant Radio</Radio>
          <Radio variant="groove" size="xl">Custom XL Variant Radio</Radio>
        </VStack>
        <ColorModeSwitcher aria-label="toggle theme" position="absolute" bottom={4} left={4} />
      </Box>
    </ChakraProvider>
  );
}`,
  Index: `import * as ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);

root.render(<App />);`,
  Theme: `import { extendTheme } from '@chakra-ui/react';
import { radioTheme } from './components/Radio';

const theme = extendTheme({
  components: {
    Radio: radioTheme,
  },
});

export default theme;`,
  Radio: `import { radioAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  control: {
    borderRadius: "md", // change the border radius
    borderColor: "blue.500" // change the border color
  }
});

const sizes = {
  // define custom styles for xl size
  xl: definePartsStyle({
    control: { w: "6", h: "6" },
    label: { fontSize: "xl" }
  })
};


// define custom variant
const variants = {
  groove: definePartsStyle({
    control: {
      borderRadius: 0,
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "purple.500",
      background: "purple.500",

      _checked: {
        background: "purple.500",
        borderColor: "purple.500",

        _hover: {
          bg: "purple.700",
          borderColor: "purple.700"
        }
      },
      _dark: {
        borderColor: "purple.200",
        background: "purple.200",

        _hover: {
          bg: "purple.400",
          borderColor: "purple.400"
        }
      },
      _hover: {
        bg: "purple.700",
        borderColor: "purple.700"
      }
    }
  })
};

// export the component theme
export const radioTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
});`,
  ColorModeSwitcher: `import { useColorMode, useColorModeValue, IconButton, IconButtonProps } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = (props: IconButtonProps) => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      size="xs"
      rounded="full"
      fontSize="lg"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};`,
}
