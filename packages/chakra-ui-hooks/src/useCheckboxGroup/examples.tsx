import React from "react";
import { storiesOf } from "@storybook/react";
import useCheckboxGroup from "./useCheckboxGroup";
import useCheckbox, { UseCheckboxOptions } from '../useCheckbox/useCheckbox';

const stories = storiesOf("useCheckbox", module);

function Checkbox(props: UseCheckboxOptions & { children: React.ReactNode }) {
  const { hiddenCheckbox, checkbox } = useCheckbox(props);
  return (
    <div {...checkbox}>
      <input {...hiddenCheckbox} />
      {props.children}
    </div>
  );
}

export function CheckExample2(props: any) {
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

stories.add("Checkbox + group", () => <CheckExample2 />);
