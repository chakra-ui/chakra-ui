import { ThemeProvider } from "@chakra-ui/theme";
// import { Box } from "@chakra-ui/layout";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import useTabbable from "./useTabbable";
import { createChakra } from "@chakra-ui/system";

const stories = storiesOf("useTabbable", module).addDecorator(story => (
  <ThemeProvider>{story()}</ThemeProvider>
));

const Button = createChakra({ as: "button", hook: useTabbable });

// function Button(props: { children?: React.ReactNode }) {
//   const tabbable = useTabbable({
//     isDisabled: true,
//     isFocusable: true,
//     tabIndex: 0,
//     onClick: () => console.log("hello"),
//   });
//   return (
//     <Box
//       p="20px"
//       bg="blue.500"
//       color="white"
//       borderRadius="4px"
//       _disabled={{ cursor: "not-allowed" }}
//       _focus={{ border: "5px solid red", outline: "0" }}
//       {...tabbable}
//     >
//       {props.children}
//     </Box>
//   );
// }

stories.add("Button", () => (
  <Button
    isDisabled
    isFocusable
    onClick={event => {
      console.log("clicked");
    }}
  >
    Hello world
  </Button>
));
