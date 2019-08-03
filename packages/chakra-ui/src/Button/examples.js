import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import Box from "../Box";
import Button from ".";

const stories = storiesOf("Button", module);
stories.addDecorator(withKnobs);
stories.addDecorator(story => {
  return (
    <Box maxWidth="lg" mx="auto" mt={6} p={6}>
      {story()}
    </Box>
  );
});

stories.add("Default", () => (
  <Box>
    {[
      "blue",
      "green",
      "red",
      "orange",
      "gray",
      "cyan",
      "teal",
      "purple",
      "pink",
      "whatsapp",
      "linkedin",
      "facebook",
      "messenger",
      "telegram",
    ].map(color => (
      <Button
        m={3}
        variant={select(
          "variant",
          ["ghost", "outline", "solid", "link", "unstyled"],
          "solid",
        )}
        size={select("size", ["sm", "md", "lg"], "md")}
        isLoading={boolean("isLoading?", false)}
        loadingText={text("loadingText", "Loading")}
        isFullWidth={boolean("isFullWidth?", false)}
        isDisabled={boolean("isDisabled?", false)}
        color={color}
      >
        {color.toUpperCase()}
      </Button>
    ))}
  </Box>
));
