module.exports = {
  App: `import React from 'react';
import {
  ChakraProvider,
  Box,
  SimpleGrid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import theme from './theme';
import { ColorModeSwitcher } from './ColorModeSwitcher';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box position="relative" h="100vh" p={12}>
        <SimpleGrid columns={[1, 1, 1, 2]} spacing={12}>
          <GridItem>
            <Tabs>
              <TabList>
                <Tab>One</Tab>
                <Tab>Two</Tab>
                <Tab>Three</Tab>
                <Tab isDisabled>Disabled</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <p>New default appearance defined by theme</p>
                </TabPanel>
                <TabPanel>
                  <p>Tab panel two</p>
                </TabPanel>
                <TabPanel>
                  <p>Tab panel three</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>
          <GridItem>
            <Tabs size="lg" colorScheme="purple">
              <TabList>
                <Tab>One</Tab>
                <Tab>Two</Tab>
                <Tab>Three</Tab>
                <Tab isDisabled>Disabled</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <p>Large size with purple color scheme</p>
                </TabPanel>
                <TabPanel>
                  <p>Tab panel two</p>
                </TabPanel>
                <TabPanel>
                  <p>Tab panel three</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>
          <GridItem>
            <Tabs size="md" colorScheme="cyan">
              <TabList>
                <Tab>One</Tab>
                <Tab>Two</Tab>
                <Tab>Three</Tab>
                <Tab isDisabled>Disabled</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <p>Medium size with cyan color scheme</p>
                </TabPanel>
                <TabPanel>
                  <p>Tab panel two</p>
                </TabPanel>
                <TabPanel>
                  <p>Tab panel three</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>
          <GridItem>
            <Tabs size="sm" colorScheme="orange">
              <TabList>
                <Tab>One</Tab>
                <Tab>Two</Tab>
                <Tab>Three</Tab>
                <Tab isDisabled>Disabled</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <p>Small size with orange color scheme</p>
                </TabPanel>
                <TabPanel>
                  <p>Tab panel two</p>
                </TabPanel>
                <TabPanel>
                  <p>Tab panel three</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>
        </SimpleGrid>
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
import { tabsTheme } from './components/Tabs';

const theme = extendTheme({
  components: {
    Tabs: tabsTheme,
  },
});

export default theme;`,
  Tabs: `import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools'; // import utility for setting light and dark mode props

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  tab: {
    fontWeight: 'semibold', // change the font weight
  },
  tabpanel: {
    fontFamily: 'mono', // change the font family
  },
});

// define custom sizes
const sizes = {
  xl: definePartsStyle({
    // define the parts that will change for each size
    tab: {
      fontSize: 'xl',
      py: '4',
      px: '6',
    },
    tabpanel: {
      py: '4',
      px: '6',
    },
  }),
};

// define custom variants
const colorfulVariant = definePartsStyle(props => {
  const { colorScheme: c } = props; // add colorScheme as a prop

  return {
    tab: {
      border: '2px solid',
      borderColor: 'transparent',
      bg: mode(\`\${c}.300\`, \`\${c}.600\`)(props),
      borderTopRadius: 'lg',
      borderBottom: 'none',
      _selected: {
        bg: mode('#fff', 'gray.800')(props),
        color: mode(\`\${c}.500\`, \`\${c}.300\`)(props),
        borderColor: 'inherit',
        borderBottom: 'none',
        mb: '-2px',
      },
    },
    tablist: {
      borderBottom: '2x solid',
      borderColor: 'inherit',
    },
    tabpanel: {
      border: '2px solid',
      borderColor: 'inherit',
      borderBottomRadius: 'lg',
      borderTopRightRadius: 'lg',
    },
  };
});

const variants = {
  colorful: colorfulVariant,
};

// define which sizes, variants, and color schemes are applied by default
const defaultProps = {
  size: 'xl',
  variant: 'colorful',
  colorScheme: 'green',
};

// export the component theme
export const tabsTheme = defineMultiStyleConfig({
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
