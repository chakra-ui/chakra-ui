import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import Box from "../Box";
import Badge from "../Badge";

const stories = storiesOf("Badge", module);
stories.addDecorator(withKnobs);
stories.addDecorator(story => (
  <Box maxWidth="md" mt="40px" mx="auto">
    {story()}
  </Box>
));

stories.add("Default", () => {
  return <Badge color="green">Success</Badge>;
});

stories.add("Solid Badges", () => {
  return (
    <React.Fragment>
      {["gray", "green", "red", "orange", "purple", "teal"].map(color => (
        <Badge variantColor={color} variant="solid" mr={2}>
          {color}
        </Badge>
      ))}
    </React.Fragment>
  );
});

stories.add("Subtle Badges", () => {
  return (
    <React.Fragment>
      {["gray", "green", "red", "orange", "purple", "teal"].map(color => (
        <Badge variantColor={color} mr={2}>
          {color}
        </Badge>
      ))}
    </React.Fragment>
  );
});

stories.add("Outline Badges", () => {
  return (
    <React.Fragment>
      {["gray", "green", "red", "orange", "purple", "teal"].map(color => (
        <Badge variantColor={color} variant="outline" mr={2}>
          {color}
        </Badge>
      ))}
    </React.Fragment>
  );
});
