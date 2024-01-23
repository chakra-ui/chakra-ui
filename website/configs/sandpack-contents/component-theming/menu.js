module.exports = {
  App: `import {
  ChakraProvider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Box,
  Center,
} from '@chakra-ui/react';
import theme from './theme';
import { ColorModeSwitcher } from './ColorModeSwitcher';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box position="relative" h="100vh" p={12}>
        <Center>
          <Menu variant="roundLeft">
            <MenuButton>File</MenuButton>
            <MenuList>
              <MenuItem command="Ctrl + N">New File</MenuItem>
              <MenuItem command="Ctrl + O">Open File</MenuItem>
              <MenuDivider />
              <MenuGroup title="Save">
                <MenuItem command="Ctrl + S">Save</MenuItem>
                <MenuItem command="Ctrl + Shift + S">Save As...</MenuItem>
                <MenuItem command="Ctrl + Alt + S">Save All</MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuItem>Exit</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton>Edit</MenuButton>
            <MenuList>
              <MenuItem command="Ctrl + Z">Undo</MenuItem>
              <MenuItem command="Ctrl + Y">Redo</MenuItem>
              <MenuDivider />
              <MenuGroup>
                <MenuItem command="Ctrl + X">Cut</MenuItem>
                <MenuItem command="Ctrl + C">Copy</MenuItem>
                <MenuItem command="Ctrl + V">Paste</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
          <Menu variant="roundRight">
            <MenuButton>View</MenuButton>
            <MenuList>
              <MenuItem command="Ctrl + F">Full Screen Mode</MenuItem>
              <MenuItem command="Ctrl + R">Reading Mode</MenuItem>
              <MenuDivider />
              <MenuGroup title="Zoom">
                <MenuItem command="Ctrl + 1">Actual Size</MenuItem>
                <MenuItem command="Ctrl + 2">Fit Width</MenuItem>
                <MenuItem command="Ctrl + 3">Height</MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuOptionGroup
                title="Display Size"
                type="radio"
                defaultValue={'standard'}
              >
                <MenuItemOption value="small" closeOnSelect={false}>
                  Small
                </MenuItemOption>
                <MenuItemOption value="standard" closeOnSelect={false}>
                  Standard
                </MenuItemOption>
                <MenuItemOption value="large" closeOnSelect={false}>
                  Large
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Center>
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
import { menuTheme } from './components/Menu';

const theme = extendTheme({
  components: {
    Menu: menuTheme,
  },
});

export default theme;`,
  Menu: `import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  button: {
    // this will style the MenuButton component
    fontWeight: 'medium',
    bg: 'teal.500',
    color: 'gray.200',
    _hover: {
      bg: 'teal.600',
      color: 'white',
    },
  },
  list: {
    // this will style the MenuList component
    py: '4',
    borderRadius: 'xl',
    border: 'none',
    bg: 'teal.500',
  },
  item: {
    // this will style the MenuItem and MenuItemOption components
    color: 'gray.200',
    _hover: {
      bg: 'teal.600',
    },
    _focus: {
      bg: 'teal.600',
    },
  },
  groupTitle: {
    // this will style the text defined by the title prop
    // in the MenuGroup and MenuOptionGroup components
    textTransform: 'uppercase',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 'wider',
    opacity: '0.7',
  },
  command: {
    // this will style the text defined by the command
    // prop in the MenuItem and MenuItemOption components
    opacity: '0.8',
    fontFamily: 'mono',
    fontSize: 'sm',
    letterSpacing: 'tighter',
    pl: '4',
  },
  divider: {
    // this will style the MenuDivider component
    my: '4',
    borderColor: 'white',
    borderBottom: '2px dotted',
  },
});

// define custom styles
const lg = defineStyle({
  fontSize: 'md',
  my: '1',
});

const xl = defineStyle({
  fontSize: 'lg',
  px: '4',
  py: '2',
});

// define custom sizes
const sizes = {
  // apply custom styles to parts
  xl: definePartsStyle({
    button: xl,
    item: xl,
    groupTitle: lg,
    command: xl,
  }),
};

// define custom variants
const variants = {
  roundLeft: definePartsStyle({
    button: {
      borderLeftRadius: 'full',
      pl: '6',
    },
  }),
  roundRight: definePartsStyle({
    button: {
      borderRightRadius: 'full',
      pr: '6',
    },
  }),
};

// export the component theme
export const menuTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    // define which size is applied by default
    size: 'xl',
  },
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
