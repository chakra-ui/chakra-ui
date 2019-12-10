import React from "react";
import { storiesOf } from "@storybook/react";
import useCheckboxGroup from "./useCheckboxGroup";
import useCheckbox, { UseCheckboxOptions } from "../useCheckbox/useCheckbox";

const stories = storiesOf("useCheckboxGroup", module);

function Checkbox(props: UseCheckboxOptions & { children: React.ReactNode }) {
  const { hiddenCheckbox, checkbox } = useCheckbox(props);
  return (
    <label {...checkbox}>
      <input {...hiddenCheckbox} />
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
