import { storiesOf } from "@storybook/react";
import React from "react";
import Button from "../Button";
import Box from "../Box";
import Icon from "../Icon";
import Tooltip from ".";

const stories = storiesOf("Tooltip", module);
stories.addDecorator(story => {
  return (
    <Box maxWidth="lg" mx="auto" mt={6} p={6}>
      {story()}
    </Box>
  );
});

stories.add("Default", () => (
  <Tooltip label="Welcome home" placement="right" closeOnClick>
    <Button variant="solid" color="blue">
      Close
    </Button>
  </Tooltip>
));

stories.add("with a string", () => (
  <Tooltip label="Welcome home">This is a sample</Tooltip>
));

stories.add("with icon", () => (
  <Tooltip label="Welcome home" placement="bottom">
    <Icon name="phone" />
  </Tooltip>
));
