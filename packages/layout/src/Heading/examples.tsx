import React from "react";
import { storiesOf } from "@storybook/react";
import { Heading } from ".";
import { ThemeProvider, CSSReset } from "@chakra-ui/theme";

const stories = storiesOf("Heading", module);

stories.addDecorator(story => (
  <ThemeProvider>
    <CSSReset />
    {story()}
  </ThemeProvider>
));

stories.add("Default", () => (
  <>
    {["2xl", "xl", "lg", "md", "sm", "xs"].map((size, index) => (
      <Heading size={size as any}>Heading {index + 1}</Heading>
    ))}
  </>
));
