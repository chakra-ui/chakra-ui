module.exports = {
  App: `import React from 'react';
import { ChakraProvider, Box, Container, VStack } from '@chakra-ui/react';
import theme from './theme';
import { ColorModeSwitcher } from './ColorModeSwitcher';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box position="relative" h="100vh" p={4}>
        <VStack>
          <Container>
            This container has the new theme default properties applied of
            medium size, brand color scheme, and colorful variant.
          </Container>
          <Container size="sm" colorScheme="gray">
            This container has the small size, gray color scheme, and new
            default colorful variant applied.
          </Container>
          <Container size="lg" variant="bold">
            This container has the large size, no color scheme, and the bold
            variant applied.
          </Container>
          <Container size="sm" variant="bold">
            This container has the small size, no color scheme, and the bold
            variant applied.
          </Container>
          <Container size="lg" variant="colorful" colorScheme="blue">
            This container has the new default colorful variant with the large
            size and blue color scheme applied.
          </Container>
        </VStack>
        <ColorModeSwitcher position="fixed" bottom={3} left={3} />
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
import { containerTheme } from './components/Container';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#dafff3',
      100: '#adffe2',
      200: '#7dfed5',
      300: '#4efeca',
      400: '#25fec3',
      500: '#13e4b1',
      600: '#01b18f',
      700: '#007f5d',
      800: '#004d32',
      900: '#001b0e',
    },
  },
  components: {
    Container: containerTheme,
  },
});

export default theme;`,
  Container: `import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

// define the base styles of the component
const baseStyle = {
  borderRadius: 'xl', // add a border radius
  fontWeight: 'medium', // change the font weight
};

// define custom sizes
const sizes = {
  sm: defineStyle({
    maxW: '45ch',
    p: '4',
  }),
  md: defineStyle({
    maxW: 'container.sm',
    p: '6',
    fontSize: 'lg',
  }),
  lg: defineStyle({
    maxW: '75ch',
    p: '8',
    fontSize: 'xl',
  }),
};

// define styles for the custom variants
const colorfulVariant = defineStyle(props => {
  const { colorScheme: c } = props; // add color scheme as a prop
  return {
    _light: {
      bg: \`\${c}.200\`,
      color: \`\${c}.800\`,
    },
    _dark: {
      bg: \`\${c}.700\`,
      color: \`\${c}.200\`,
    },
  };
});

const boldVariant = defineStyle(props => {
  return {
    borderRadius: 'none',
    border: '2px solid',
    fontFamily: 'mono',
    _light: {
      bg: 'white',
      color: 'black',
    },
    _dark: {
      bg: 'black',
      color: 'white',
    },
  };
});

// define the custom variants
const variants = {
  colorful: colorfulVariant,
  bold: boldVariant,
};

// define which sizes, variants, and color schemes are applied by default
const defaultProps = {
  size: 'md',
  variant: 'colorful',
  colorScheme: 'brand',
};

// export the component theme
export const containerTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps,
});`,
  ColorModeSwitcher: `import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      size="xs"
      rounded="full"
      aria-label={\`Switch to \${text} mode\`}
      position="fixed"
      bottom={3}
      left={3}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};`,
}
