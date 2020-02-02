/**@jsx jsx */
import { storiesOf } from "@storybook/react";
import { jsx } from "../system";
import chakra from "./chakra";
import setup from "../../story.setup";

const stories = storiesOf("chakra", module);

stories.addDecorator(setup);

// Any html element + chakra = magic!
stories.add("basic", () => (
  <chakra.h1 color="red.400">Chakra heading</chakra.h1>
));

// You can add simple interactive styles
stories.add("interactive 1", () => (
  <chakra.a
    color="gray.300"
    href="#"
    textDecoration="none"
    _hover={{ textDecoration: "underline" }}
    target="__blank"
    rel="noreferrer"
  >
    Chakra anchor
  </chakra.a>
));

// You can add interactive styles anyhow!
stories.add("interactive 2", () => (
  <chakra.div
    bg="red.500"
    size="200px"
    _hover={{ bg: "red.600", size: "250px" }}
    transition="all 0.3s"
  >
    Expanding Div
  </chakra.div>
));

// You can pull styles from `theme.styles` and apply it to any element
stories.add("apply", () => (
  <chakra.p apply="styles.h1">
    This is a paragraph, but apply styles from{" "}
    <chakra.code fontFamily="mono">styles.h1</chakra.code>
  </chakra.p>
));

// The `sx` prop requires that you use the jsx pragma at the top of the file
stories.add("sx prop", () => (
  <h1
    sx={{
      color: "red.100",
      transition: "all 0.3s",
      padding: "30px",
      _hover: {
        color: "red.300",
      },
      _active: {
        color: "red.400",
      },
    }}
  >
    This is a heading
  </h1>
));

// You can create your own components from chakra as well.
const Box = chakra.div;

const Flex = Box;
Flex.defaultProps = {
  display: "flex",
};

stories.add("component", () => (
  <Flex>
    <Box
      color="red.300"
      flex="1"
      sx={{
        margin: 20,
        fontSize: "40px",
      }}
    >
      Div 1
    </Box>
    <Box>Div 2</Box>
  </Flex>
));
