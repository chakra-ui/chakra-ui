import { storiesOf } from "@storybook/react";
import * as React from "react";
import createChakra from "../create-chakra";
import setup from "../../chakra/stories/setup";

const stories = storiesOf("createChakra", module);

stories.addDecorator(setup);

const Button = createChakra("button", {
  themeKey: "Button",
});

Button.defaultProps = {
  cursor: "pointer",
  outline: 0,
  border: 0,
  display: "inline-flex",
  appearance: "none",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 250ms",
  userSelect: "none",
  position: "relative",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  lineHeight: "1.2",
  borderRadius: "md",
  _focus: {
    boxShadow: "outline",
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
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

stories.add("variant", () => (
  <Button
    variantSize="lg"
    variant="solid"
    variantColor="blue"
    aria-disabled="true"
  >
    This is my button
  </Button>
));

const Alert = createChakra("div", { themeKey: "Alert" });

stories.add("alert", () => (
  <Alert variant="left-accent" variantColor="green" role="alert">
    Welcome to alert
  </Alert>
));
