import { storiesOf } from "@storybook/react";
import React from "react";
import Box from "../Box";
import Stack from "../Stack";
import Switch from "../Switch";

const stories = storiesOf("Switch", module);

stories.addDecorator(story => {
  return (
    <Box maxWidth="lg" mx="auto" mt={6} p={6}>
      {story()}
    </Box>
  );
});

stories.add("Default", () => (
  <Stack inline>
    <Switch
      size="sm"
      onChange={e => console.log(e.target.checked)}
      color="green"
    />
    <Switch
      size="md"
      onChange={e => console.log(e.target.checked)}
      color="blue"
    />
    <Switch
      size="lg"
      onChange={e => console.log(e.target.checked)}
      color="cyan"
    />
  </Stack>
));
