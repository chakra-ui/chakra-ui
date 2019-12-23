import React from "react";
import { storiesOf } from "@storybook/react";
import { Image } from ".";
import { ThemeProvider, CSSReset } from "@chakra-ui/theme";

const stories = storiesOf("Image", module).addDecorator(story => (
  <ThemeProvider>
    <CSSReset />
    {story()}
  </ThemeProvider>
));

stories.add("Default", () => (
  <Image
    htmlWidth="100px"
    src="https://avatars3.githubusercontent.com/u/37928?s=52&v=4"
  />
));
