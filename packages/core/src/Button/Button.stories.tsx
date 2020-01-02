import * as React from "react";
import { storiesOf } from "@storybook/react";
import setup from "../story.setup";
import { Stack } from "@chakra-ui/layout";
import Button from "./Button";

const stories = storiesOf("Button", module);

stories.addDecorator(setup);

stories.add("variants", () => (
  <Stack direction="row" spacing="24px">
    <Button variantColor="teal" variant="solid">
      Button
    </Button>
    <Button variantColor="teal" variant="outline">
      Button
    </Button>
    <Button variantColor="teal" variant="ghost">
      Button
    </Button>
    <Button variantColor="teal" variant="link">
      Button
    </Button>
  </Stack>
));

stories.add("sizes", () => (
  <Stack direction="row">
    <Button variantColor="blue" variantSize="xs">
      Button
    </Button>
    <Button variantColor="blue" variantSize="sm">
      Button
    </Button>
    <Button variantColor="blue" variantSize="md">
      Button
    </Button>
    <Button variantColor="blue" variantSize="lg">
      Button
    </Button>
  </Stack>
));

stories.add("with left icon", () => (
  <Button variantColor="pink" leftIcon="phone">
    Call Us
  </Button>
));

const AddCircle = (props: any) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    {...props}
  >
    <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm90.5 224H272v74.5c0 8.8-7.2 16-16 16-4.4 0-8.4-1.8-11.3-4.7-2.9-2.9-4.7-6.9-4.7-11.3V272h-74.5c-4.4 0-8.4-1.8-11.3-4.7-2.9-2.9-4.7-6.9-4.7-11.3 0-8.8 7.2-16 16-16H240v-74.5c0-8.8 7.2-16 16-16s16 7.2 16 16V240h74.5c8.8 0 16 7.2 16 16s-7.2 16-16 16z"></path>
  </svg>
);

stories.add("with custom icon", () => (
  <Button leftIcon={AddCircle}>Call Us</Button>
));

stories.add("with loading", () => (
  <Button variantColor="pink" isLoading loadingText="Loading...">
    Pink Button
  </Button>
));
