import React from "react";
import { storiesOf } from "@storybook/react";
import { Heading } from ".";
import { createThemeContext } from "@chakra-ui/system";
import theme from "@chakra-ui/preset-base";
import { CSSReset } from "@chakra-ui/theme";

const [ThemeProvider] = createThemeContext(theme);

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
      <Heading variantSize={size}>Heading {index + 1}</Heading>
    ))}
  </>
));
