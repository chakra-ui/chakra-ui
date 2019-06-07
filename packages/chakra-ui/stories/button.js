import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import Button from "../src/Button";
import { Box } from "../src/Layout";
import CloseButton from "../src/CloseButton";
import ActionButtons from "../src/ActionButtons";

const stories = storiesOf("Button & Links", module);
stories.addDecorator(withKnobs);

stories.add("Button", () => (
  <Box mt={3} maxWidth="md" mx="auto">
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
      "telegram"
    ].map(color => (
      <Button
        m={3}
        variant={select(
          "variant",
          ["ghost", "outline", "solid", "link", "unstyled"],
          "solid"
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

stories.add("Close Button", () => (
  <Box mt={3} maxWidth="md" mx="auto">
    {["sm", "md", "lg", "xl", "2xl"].map(size => (
      <CloseButton size={size} mr={4} />
    ))}
  </Box>
));

stories.add("Action Buttons", () => (
  <Box mt={3} maxWidth="md" mx="auto">
    <ActionButtons />
  </Box>
));
