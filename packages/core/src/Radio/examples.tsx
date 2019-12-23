import { storiesOf } from "@storybook/react";
import React, { Fragment } from "react";
import { Radio } from ".";
import { Box } from "@chakra-ui/layout";
import { RadioGroup } from "../RadioGroup";
import { ThemeProvider, CSSReset } from "@chakra-ui/theme";

const stories = storiesOf("Radio", module).addDecorator(story => (
  <ThemeProvider>
    <CSSReset />
    <Box maxWidth="lg" mx="auto" mt={6} p={6}>
      {story()}
    </Box>
  </ThemeProvider>
));

stories.add("Default", () => (
  <>
    <Radio value="male" name="bee">
      Male
    </Radio>
    <Radio ml={3} value="female" name="bee">
      Female
    </Radio>
  </>
));

stories.add("Inline Radio ", () => (
  <RadioGroup
    isInline
    size="lg"
    defaultValue="male"
    onChange={value => console.log(value)}
  >
    <Radio value="male">Male</Radio>
    <Radio value="female">Female</Radio>
  </RadioGroup>
));
