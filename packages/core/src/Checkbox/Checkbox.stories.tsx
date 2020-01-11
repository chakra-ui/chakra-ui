import { chakra, createChakra } from "@chakra-ui/system";
import { storiesOf } from "@storybook/react";
import React from "react";
import {
  Checkbox,
  CheckboxInput,
  CheckboxProvider,
  CustomCheckbox,
  useCheckboxState,
} from ".";
import setup from "../story.setup";
import useCheckboxGroup from "./CheckboxGroup.hook";

const stories = storiesOf("checkbox", module);

stories.addDecorator(setup);

stories.add("default", () => <Checkbox />);

function IndeterminateExample() {
  const [checkedItems, setCheckedItems] = React.useState([false, false]);

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
      <chakra.div pl="20px" mt="12px">
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
      </chakra.div>
    </>
  );
}

stories.add("indeterminate checkbox", () => <IndeterminateExample />);

const CheckBox = createChakra(CustomCheckbox);

const CheckIcon = () => {
  const { isChecked } = useCheckboxState();
  return <>{isChecked ? "✔️" : null}</>;
};

stories.add("custom composition", () => (
  <CheckboxProvider>
    <CheckboxInput />
    <CheckBox
      display="inline-block"
      border="1px solid gray"
      _checked={{ bg: "green" }}
      _focus={{ outline: "3px dotted red" }}
    >
      Click me to check
      <CheckIcon />
    </CheckBox>
  </CheckboxProvider>
));

stories.add("checkbox group", () => {
  function CheckExample(props: any) {
    const checkboxGroup = useCheckboxGroup(props);
    return (
      <div>
        <code>{JSON.stringify(checkboxGroup.value)}</code>
        <div />
        {["opt1", "opt2", "opt3"].map(val => (
          <Checkbox
            key={val}
            value={val}
            isChecked={checkboxGroup.value.includes(val)}
            onChange={checkboxGroup.onChange}
          >
            {val}
          </Checkbox>
        ))}
      </div>
    );
  }

  return <CheckExample />;
});
