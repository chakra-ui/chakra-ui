import React from "react";
import { storiesOf } from "@storybook/react";
import useCheckboxGroup from "./useCheckboxGroup";
import useCheckbox, { CheckboxProps } from "../useCheckbox/useCheckbox";

const stories = storiesOf("useCheckboxGroup", module);

function Checkbox(props: CheckboxProps & { children: React.ReactNode }) {
  const { input, checkbox } = useCheckbox(props);
  return (
    <label {...checkbox}>
      <input {...input} />
      {props.children}
    </label>
  );
}

export function CheckExample(props: any) {
  const checkboxGroup = useCheckboxGroup(props);
  return (
    <div>
      <>{JSON.stringify(checkboxGroup.value)}</>
      {["opt1", "opt2", "opt3"].map(val => (
        <Checkbox
          key={val}
          value={val}
          isChecked={checkboxGroup.value.includes(val)}
          onChange={() => checkboxGroup.onChange(val)}
        >
          {val}
        </Checkbox>
      ))}
    </div>
  );
}

stories.add("default", () => <CheckExample />);
