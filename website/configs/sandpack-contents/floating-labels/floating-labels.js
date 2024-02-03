module.exports = {
  App: `import {
  ChakraProvider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  extendTheme,
  Box
} from "@chakra-ui/react";
const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)"
};
export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles
              }
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
              ...activeLabelStyles
            },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "white",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top"
            }
          }
        }
      }
    }
  }
});

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box p={8}>
        <FormControl variant="floating" id="first-name" isRequired isInvalid>
          <Input placeholder=" " />
          {/* It is important that the Label comes after the Control due to css selectors */}
          <FormLabel>First name</FormLabel>
          <FormHelperText>Keep it very short and sweet!</FormHelperText>
          <FormErrorMessage>Your First name is invalid</FormErrorMessage>
        </FormControl>
      </Box>
    </ChakraProvider>
  );
}
`,
  Index: `import * as React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
`,
}
