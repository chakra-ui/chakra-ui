module.exports = {
  App: `import {
  ChakraProvider,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Center,
} from '@chakra-ui/react';
import theme from './theme';
import { ColorModeSwitcher } from './ColorModeSwitcher';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box position="relative" h="100vh" p={12}>
        <Center>
        <Card >
        <CardHeader>
          <Heading>Hike with me</Heading>
        </CardHeader>
        <CardBody>
          Hiking is a long, vigorous walk, usually on trails or footpaths in the
          countryside. Walking for pleasure developed in Europe during the
          eighteenth century.
        </CardBody>
        <CardFooter>
          <Button colorScheme="blue">Sign up</Button>
        </CardFooter>
      </Card>
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
import { cardTheme } from './components/Card';

const theme = extendTheme({
  components: {
    Card: cardTheme,
  },
});

export default theme;`,
  Card: `import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    backgroundColor: "blue.50",
    _dark:{
      backgroundColor: "blue.800",
    }
  },
  header: {
    paddingBottom: "2px"
  },
  body: {
    paddingTop: "2px"
  },
  footer: {
    paddingTop: "4px"
  }
});

const sizes = {
  md: definePartsStyle({
    container: {
      borderRadius: "0"
    }
  }),
  // define custom styles for xl size
  xl: definePartsStyle({
    container: {
      borderRadius: "36px",
      padding: "40px"
    }
  })
};


// define custom variant
  const variants = {
  funky: definePartsStyle({
    container: {
      borderColor: "#459cc6",
      borderWidth: "3px",
      color: "chakra-body-text"
    }
  })
};

// export the component theme
export const cardTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    // define which size and variant is applied by default
    size: "xl",
    variant: "funky"
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
