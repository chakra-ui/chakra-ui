import { FunctionArguments } from "@chakra-ui/utils";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import setup from "../../../story.setup";
import createChakra from "../create-chakra";
import { PropsOf } from "../types";

const stories = storiesOf("createChakra", module);

stories.addDecorator(setup);

type HookProps<T extends Function> = FunctionArguments<T>[0];

/**
 * Here's how to create a button component
 * w/ some type safety for variant and variantSize
 */
type ButtonProps = PropsOf<"button"> & {
  variantSize?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "ghost" | "link";
  variantColor?: "red" | "green" | "pink" | "blue";
};

const Button = createChakra("button", {
  themeKey: "Button",
  attrs: { type: "button" },
});

Button.displayName = "Button";

Button.defaultProps = {
  variantSize: "md",
  variant: "solid",
  variantColor: "green",
};

stories.add("variant size", () => (
  <Button marginTop="40px">This is my button</Button>
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
