/**@jsx jsx */
import { jsx } from "@emotion/core";
import { theme } from "@chakra-ui/theme";
import { storiesOf } from "@storybook/react";
// import * as React from "react";
import { forwardRef } from "../forward-ref";
import chakra from "./chakra";
import { ChakraComponent, PropsOf } from "./types";
import createThemeContext from "../create-theme-context";

const stories = storiesOf("chakra", module);

const [ThemeProvider] = createThemeContext({
  ...theme,
  styles: {
    h1: {
      fontSize: 40,
      margin: 30,
      color: "green.200",
    },
    h2: {
      fontSize: "2xl",
      margin: 10,
      color: "red.500",
    },
  },
});

stories.addDecorator(story => <ThemeProvider>{story()}</ThemeProvider>);

const Box = chakra.div;
type BoxProps = PropsOf<typeof Box>;

const Flex = forwardRef(
  (props: Omit<BoxProps, "ref">, ref: BoxProps["ref"]) => (
    <Box ref={ref} display="flex" {...props} />
  ),
) as ChakraComponent<"div">;

const VisuallyHidden = forwardRef(
  (props: Omit<BoxProps, "ref">, ref: BoxProps["ref"]) => (
    <Box ref={ref} css={{}} {...props} />
  ),
) as ChakraComponent<"div">;

stories.add("chakra", () => (
  <div>
    <h1>This is a heading</h1>
    <Flex>
      <Box color="red.300" flex="1">
        Div 1
      </Box>
      <Box>Div 2</Box>
    </Flex>
    <chakra.h1
      margin="0"
      color="red.400"
      transition="all 0.3s"
      pl="30px"
      _hover={{ color: "red.700" }}
    >
      This is chakra heading
    </chakra.h1>

    <chakra.a
      apply="styles.h1"
      textDecor="none"
      _hover={{ textDecor: "underline" }}
      href="www.google.com"
      target="__blank"
      rel="noreferrer"
    >
      This is anchor
    </chakra.a>

    <chakra.h2 apply="styles.h2" fontFamily="Inter">
      This is chakra heading
    </chakra.h2>

    <div>This is a normal div</div>
    <chakra.div bg="red.200" color="white">
      This is a chakra div
    </chakra.div>

    <chakra.img src="image.png" htmlHeight="900" />
  </div>
));

stories.add("chakra", () => (
  <chakra.div<{ src?: string }> as="img" src="image.png">
    This is a div
  </chakra.div>
));
