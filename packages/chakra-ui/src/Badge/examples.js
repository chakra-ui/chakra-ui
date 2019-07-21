import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import Box from "../Box";
import Badge from ".";

const stories = storiesOf("Badge", module);
stories.addDecorator(withKnobs);
stories.addDecorator(story => (
  <Box maxWidth="md" mt="40px" mx="auto">
    {story()}
  </Box>
));

stories.add("Default", () => {
  return (
    <React.Fragment>
      {["purple", "green", "red", "orange", "gray", "cyan"].map(color => (
        <React.Fragment>
          <Badge color={color} mr={2}>
            {color}
          </Badge>
          <Badge color={color} variant="solid" mr={2}>
            {color}
          </Badge>
          <Badge color={color} variant="outline">
            {color}
          </Badge>
          <div />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
});
