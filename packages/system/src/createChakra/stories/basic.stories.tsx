import { storiesOf } from "@storybook/react";
import * as React from "react";
import createChakra from "../create-chakra";
import setup from "../../../story.setup";
import { SystemProps } from "../../system";
import { useTabbable } from "@chakra-ui/tabbable";
import { FunctionArguments } from "@chakra-ui/utils";

const stories = storiesOf("createChakra", module);

stories.addDecorator(setup);

type HookProps<T extends Function> = FunctionArguments<T>[0];

/**
 * Here's how to create a button component
 * w/ some type safety for variant and variantSize
 */
type ButtonProps = HookProps<typeof useTabbable> & {
  variantSize?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "ghost" | "link";
  variantColor?: "red" | "green" | "pink" | "blue";
};

const Button = createChakra<"button", ButtonProps>("button", {
  hook: useTabbable,
  themeKey: "Button",
  attrs: { "data-chakra-button": "", type: "button" },
});

Button.defaultProps = {
  variantSize: "md",
  variant: "solid",
  variantColor: "green",
};

stories.add("variant size", () => (
  <Button marginTop="40px" isDisabled isFocusable>
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
