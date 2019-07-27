import { storiesOf } from "@storybook/react";
import React from "react";
import Box from "../Box";
import Checkbox from "../Checkbox";
import { ErrorMessage } from "../FormControl";

const stories = storiesOf("Checkbox", module);

stories.addDecorator(story => {
  return (
    <Box maxWidth="lg" mx="auto" mt={6} p={6}>
      {story()}
    </Box>
  );
});

stories.add("Default", () => (
  <React.Fragment>
    <Checkbox isIndeterminate defaultChecked>
      Disabled and Checked
    </Checkbox>
    <Box ml={3} mt={3}>
      <Checkbox color="pink" isFullWidth defaultChecked>
        Checkbox 1
      </Checkbox>
      <Checkbox isInvalid mt={2}>
        Checkbox 2
      </Checkbox>
      <ErrorMessage id="err">This is not valid</ErrorMessage>
    </Box>

    <br />
    <Checkbox isDisabled>Disabled </Checkbox>
    <Checkbox isChecked isDisabled>
      Disabled
    </Checkbox>
    <br />
  </React.Fragment>
));
