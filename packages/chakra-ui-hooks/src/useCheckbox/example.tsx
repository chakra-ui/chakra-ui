import React from "react";
import { storiesOf } from "@storybook/react";
import { UseCheckboxOptions } from "./useCheckbox";
import { useCheckbox } from "..";

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

stories.add("Checkbox", () => (
  <Checkbox defaultIsChecked={true} isReadOnly value="wewe">
    Select Food
  </Checkbox>
));
