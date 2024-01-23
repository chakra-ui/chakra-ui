module.exports = {
  App: `import React from 'react';
import {
  ChakraProvider,
  Box,
  Center,
  SimpleGrid,
  GridItem,
  Text,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import theme from './theme';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { QuestionIcon } from '@chakra-ui/icons';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box position="relative" h="100vh" p={12}>
        <Center>
          <SimpleGrid columns={[1, 1, 1, 2, 3]} spacing="12">
            <GridItem
            border="1px solid"
            borderRadius="xl"
            p={8}
            _light={{ bg: 'gray.200' }}
            _dark={{ bg: 'gray.700' }}
            >
              <Text display="inline-flex" alignItems="baseline">
                Hover the icon for more information.
                <Tooltip
                label="Tooltip with new theme defaults of brand color scheme and medium size."
                placement="top"
                >
                <Icon as={QuestionIcon} mx={2} color="brand.400" />
                </Tooltip>
              </Text>
            </GridItem>
            <GridItem
            border="1px solid"
            borderRadius="xl"
            p={8}
            _light={{ bg: 'gray.200' }}
            _dark={{ bg: 'gray.700' }}
            >
              <Text display="inline-flex" alignItems="baseline">
                Hover the icon for more information.
                <Tooltip
                label="Tooltip with blue color scheme and new large size."
                placement="top"
                colorScheme="blue"
                size="lg"
                >
                <Icon as={QuestionIcon} mx={2} color="blue.400" />
                </Tooltip>
              </Text>
            </GridItem>
            <GridItem
            border="1px solid"
            borderRadius="xl"
            p={8}
            _light={{ bg: 'gray.200' }}
            _dark={{ bg: 'gray.700' }}
            >
              <Text display="inline-flex" alignItems="baseline">
                Hover the icon for more information.
                <Tooltip
                label="Tooltip with green color scheme and new small size."
                placement="top"
                colorScheme="green"
                size="sm"
                >
                <Icon as={QuestionIcon} mx={2} color="green.400" />
                </Tooltip>
              </Text>
            </GridItem>
          </SimpleGrid>
        </Center>
        <ColorModeSwitcher />
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
import { tooltipTheme } from './components/Tooltip';

const theme = extendTheme({
    // add a custom color scheme
    colors: {
      brand: {
        50: '#ffeae1',
        100: '#fdc8b6',
        200: '#f5a489',
        300: '#f0805b',
        400: '#eb5d2d',
        500: '#d24314',
        600: '#a4330f',
        700: '#76240a',
        800: '#481403',
        900: '#1e0400',
      },
    },
    // add a new component theme
    components: {
      Tooltip: tooltipTheme,
    },
});

export default theme;`,
  Tooltip: `import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

// define the base component styles
const baseStyle = {
  borderRadius: 'md',
  fontWeight: 'normal',
  border: '1px solid',
};

// define custom sizes
const sizes = {
  sm: defineStyle({
  fontSize: 'sm',
  py: '1',
  px: '2',
  maxW: '200px',
  }),
  md: defineStyle({
  fontSize: 'md',
  py: '2',
  px: '3',
  maxW: '300px',
  }),
  lg: defineStyle({
  fontSize: 'lg',
  py: '2',
  px: '4',
  maxW: '350px',
  }),
};

// define styles for custom variant
const colorfulVariant = defineStyle(props => {
  const { colorScheme: c } = props; // add color scheme as a prop
  return {
    _light: {
        bg: \`\${c}.300\`,
        borderColor: \`\${c}.600\`,
        color: \`\${c}.800\`,
    },
    _dark: {
        bg: \`\${c}.600\`,
        borderColor: \`\${c}.300\`,
        color: \`\${c}.200\`,
    },
  };
});

// define custom variants
const variants = {
  colorful: colorfulVariant,
};

// define which sizes, variants, and color schemes are applied by default
const defaultProps = {
  size: 'md',
  variant: 'colorful',
  colorScheme: 'brand',
};

// export the component theme
export const tooltipTheme = defineStyleConfig({
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
