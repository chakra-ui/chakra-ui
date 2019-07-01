import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import Button, { ActionButtons } from "../src/Button";
import { Box } from "../src/Layout";
import CloseButton from "../src/CloseButton";
import Link from "../src/Link";
import Text from "../src/Text";
import { UIModeProvider } from "../src/ThemeProvider";

const stories = storiesOf("Button & Links", module);
stories.addDecorator(withKnobs);
stories.addDecorator(story => {
  return (
    <>
      <Box maxWidth="lg" mx="auto" mt={6} p={6}>
        {story()}
      </Box>
      <br />
      <UIModeProvider value="dark">
        <Box bg="gray.800" maxWidth="lg" mx="auto" mt={6} p={6}>
          {story()}
        </Box>
      </UIModeProvider>
    </>
  );
});

stories.add("Button", () => (
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
      "telegram"
    ].map(color => (
      <Button
        m={3}
        variant={select(
          "variant",
          ["ghost", "outline", "solid", "link", "unstyled"],
          "outline"
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
  <Box>
    {["sm", "md", "lg", "xl", "2xl"].map(size => (
      <CloseButton size={size} mr={4} />
    ))}
  </Box>
));

stories.add("Action Buttons", () => (
  <Box>
    <ActionButtons />
  </Box>
));

stories.add("Link", () => (
  <Box>
    <Link>This is a link</Link>
    <br />
    <Text>
      This is the way we add{" "}
      <Link fontWeight="semibold" href="www.google.com" color="green">
        a link
      </Link>{" "}
      within a text
    </Text>
  </Box>
));
