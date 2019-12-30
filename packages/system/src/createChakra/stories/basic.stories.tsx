import { storiesOf } from "@storybook/react";
import * as React from "react";
import createChakra from "../create-chakra";
import setup from "../../chakra/stories/setup";

const stories = storiesOf("createChakra", module);

stories.addDecorator(setup);

const Button = createChakra("button", {
  themeKey: "components.Button",
});

Button.defaultProps = {
  cursor: "pointer",
  outline: 0,
  border: 0,
  _focus: { shadow: "outline" },
};

stories.add("variant size", () => (
  <Button
    variantSize="md"
    bg="teal.500"
    color="white"
    _hover={{ bg: "teal.600" }}
  >
    This is my button
  </Button>
));

stories.add("variant color", () => (
  <Button
    bg="transparent"
    border="0"
    variantSize="sm"
    variant="link"
    variantColor="blue"
  >
    This is my button
  </Button>
));
