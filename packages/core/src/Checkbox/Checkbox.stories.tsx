import { storiesOf } from "@storybook/react";
import React from "react";
import { Checkbox } from "./Checkbox";
import setup from "../story.setup";

const stories = storiesOf("checkbox", module);

stories.addDecorator(setup);

stories.add("default", () => (
  <Checkbox
    _hover={{ borderColor: "gray.200", bg: "gray.50" }}
    _focus={{ shadow: "outline" }}
    _checked={{
      bg: "green.500",
      color: "white",
      _hover: { bg: "green.600" },
      _focus: { bg: "tomato" },
    }}
    isIndeterminate
    transition="all 0.2s"
    rounded="md"
    size="24px"
    border="1px solid"
    borderColor="gray.100"
  />
));
