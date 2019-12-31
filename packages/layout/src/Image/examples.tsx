import React from "react";
import { storiesOf } from "@storybook/react";
import { Image } from ".";
import { createThemeContext } from "@chakra-ui/system";
import theme from "@chakra-ui/preset-base";
import { CSSReset } from "@chakra-ui/theme";

const [ThemeProvider] = createThemeContext(theme);
const stories = storiesOf("Image", module);

stories.addDecorator(story => (
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
