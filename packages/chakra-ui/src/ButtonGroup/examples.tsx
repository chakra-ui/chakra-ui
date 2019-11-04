import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import { ButtonGroup } from ".";
import { Box } from "@chakra-ui/layout";
import { Button } from "../Button";
import { CSSReset } from "../CSSReset";
import { ThemeProvider } from "../ThemeProvider";

const stories = storiesOf("Button Group", module).addDecorator(story => (
  <ThemeProvider>
    <CSSReset />
    {story()}
  </ThemeProvider>
));

stories.addDecorator(withKnobs);
stories.addDecorator(story => {
  return (
    <Box maxWidth="lg" mx="auto" mt={6} p={6}>
      {story()}
    </Box>
  );
});

stories.add("Default", () => (
  <ButtonGroup variantColor="blue">
    <Button variant="outline">Button 1</Button>
    <Button color="blue">Button 2</Button>
    <Button variant="outline">Button 3</Button>
  </ButtonGroup>
));
