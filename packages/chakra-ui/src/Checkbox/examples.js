import { storiesOf } from "@storybook/react";
import React from "react";
import Box from "../Box";
import Checkbox from "../Checkbox";
import Stack from "../Stack";
import FormValidationText from "../FormErrorMessage";

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
      <Checkbox variantColor="pink" isFullWidth defaultChecked>
        Checkbox 1
      </Checkbox>
      <Checkbox isInvalid mt={2}>
        Checkbox 2
      </Checkbox>
      <FormValidationText isInvalid id="err">
        This is not valid
      </FormValidationText>
    </Box>

    <br />
    <Checkbox isDisabled>Disabled </Checkbox>
    <Checkbox isChecked isDisabled>
      Disabled
    </Checkbox>
    <br />
  </React.Fragment>
));

stories.add("disabled checkbox", () => (
  <React.Fragment>
    <Checkbox isDisabled>Disabled </Checkbox>
    <Checkbox isChecked isDisabled>
      Disabled
    </Checkbox>
    <br />
  </React.Fragment>
));

function IndeterminateExample() {
  const [checkedItems, setCheckedItems] = React.useState([true, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <>
      <Checkbox
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={e => setCheckedItems([e.target.checked, e.target.checked])}
        children="Parent Checkbox"
      />
      <Stack pl={6} mt={1} spacing={1}>
        <Checkbox
          isChecked={checkedItems[0]}
          onChange={e => setCheckedItems([e.target.checked, checkedItems[1]])}
          children="Child Checkbox 1"
        />
        <Checkbox
          isChecked={checkedItems[1]}
          onChange={e => setCheckedItems([checkedItems[0], e.target.checked])}
          children="Child Checkbox 2"
        />
      </Stack>
    </>
  );
}

stories.add("indeterminate checkbox", () => <IndeterminateExample />);
