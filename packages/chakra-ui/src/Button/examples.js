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

stories.add("with left icon", () => <Button leftIcon="phone">Call Us</Button>);

const AddCircle = props => (
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
