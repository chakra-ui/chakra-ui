import { ThemeProvider } from "@chakra-ui/theme";
import { Box } from "@chakra-ui/layout";
import { storiesOf } from "@storybook/react";
import React from "react";
import useTabbable from "./useTabbable";

const stories = storiesOf("useTabbable", module).addDecorator(story => (
  <ThemeProvider>{story()}</ThemeProvider>
));

function Button(props: { children?: React.ReactNode }) {
  const tabbableProps = useTabbable<HTMLDivElement>({
    isDisabled: true,
    isFocusable: true,
    tabIndex: 0,
    onClick: () => console.log("hello"),
  });
  return (
    <Box
      p="20px"
      bg="blue.500"
      color="white"
      borderRadius="4px"
      _disabled={{ cursor: "not-allowed" }}
      _focus={{ border: "5px solid red", outline: "0" }}
      {...tabbableProps}
    >
      {props.children}
    </Box>
  );
}

stories.add("Button", () => <Button>Hello world</Button>);
