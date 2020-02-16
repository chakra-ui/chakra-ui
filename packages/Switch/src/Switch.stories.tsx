import { storiesOf } from "@storybook/react";
import React from "react";
import Switch from "./Switch";
import { chakra } from "@chakra-ui/system";

const stories = storiesOf("Switch", module);

stories.addDecorator(story => {
  return (
    <chakra.div maxWidth="lg" mx="auto" mt={6} p={6}>
      {story()}
    </chakra.div>
  );
});

stories.add("base", () => (
  <>
    <Switch variantSize="sm" variantColor="green" margin="20px" />
    <Switch variantSize="md" variantColor="blue" margin="20px" />
    <Switch variantSize="lg" variantColor="cyan" />
  </>
));
