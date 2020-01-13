import { storiesOf } from "@storybook/react";
import * as React from "react";
import createChakra from "../create-chakra";
import setup from "../../chakra/stories/setup";
import { SystemProps } from "../../system";

const stories = storiesOf("createChakra", module);

stories.addDecorator(setup);

/**
 * createChakra takes 3 options
 * - The tag
 * - The options:
 *  - themeKey: the reference to the styles in the theme.components
 *  - hook: To execute a hook within the components
 *  - dataAttr: A unique data-chakra-* attribute
 *  - baseStyle: Some base styles to apply to the component
 */

const baseStyle: SystemProps = {
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
  color: "yellow.100",
  _focus: {
    boxShadow: "outline",
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
};

type ButtonOptions = {
  variantSize?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "ghost" | "link";
};

const Button = createChakra<"button", ButtonOptions>("button", {
  // themeKey: "Button",
  dataAttr: "button",
  baseStyle,
});

Button.defaultProps = {
  variantSize: "md",
};

stories.add("variant size", () => (
  <Button
    variantSize="lg"
    bg="teal.500"
    // color="white"
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
  <Alert variant="solid" variantColor="green" role="alert">
    Welcome to alert
  </Alert>
));
