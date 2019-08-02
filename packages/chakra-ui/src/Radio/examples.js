import { storiesOf } from "@storybook/react";
import React, { Fragment } from "react";
import Radio from ".";
import Box from "../Box";
import RadioGroup from "../RadioGroup";

const stories = storiesOf("Radio", module);
stories.addDecorator(story => {
  return (
    <Box maxWidth="lg" mx="auto" mt={6} p={6}>
      {story()}
    </Box>
  );
});

stories.add("Default", () => (
  <Fragment>
    <Radio value="male" defaultChecked name="bee">
      Male
    </Radio>
    <Radio ml={3} value="female" name="bee" defaultChecked>
      Female
    </Radio>
  </Fragment>
));

stories.add("Inline Radio ", () => (
  <RadioGroup
    // isInline
    size="lg"
    // spacing={5}
    defaultValue="male"
    onChange={(event, value) => console.log(value)}
  >
    <Radio value="male">Male</Radio>
    <Radio value="female">Female</Radio>
  </RadioGroup>
));
