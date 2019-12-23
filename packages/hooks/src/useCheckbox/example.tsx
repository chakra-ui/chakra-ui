import React from "react";
import { storiesOf } from "@storybook/react";
import { UseCheckboxOptions } from "./useCheckbox";
import { useCheckbox } from "..";

const stories = storiesOf("useCheckbox", module);

function Checkbox(props: UseCheckboxOptions & { children: React.ReactNode }) {
  const { hiddenCheckbox, checkbox } = useCheckbox(props);
  return (
    <label {...checkbox}>
      <input {...hiddenCheckbox} />
      {props.children}
    </label>
  );
}

stories.add("default", () => (
  <Checkbox defaultIsChecked={true} isReadOnly value="wewe">
    Select Food
  </Checkbox>
));
