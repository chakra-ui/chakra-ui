import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Welcome } from "@storybook/react/demo";
import {
  Button,
  ThemeProvider,
  theme,
  UIModeProvider,
  CSSReset,
  Box
} from "@chakra/ui";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Button", module)
  .addDecorator(story => (
    <UIModeProvider value="light">
      <ThemeProvider theme={theme}>
        <Box maxWidth="sm" mx="auto" mt={4}>
          <CSSReset />
          {story()}
        </Box>
      </ThemeProvider>
    </UIModeProvider>
  ))
  .add("with text", () => (
    <Button color="red" onClick={action("clicked")}>
      Hello Button
    </Button>
  ))
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
