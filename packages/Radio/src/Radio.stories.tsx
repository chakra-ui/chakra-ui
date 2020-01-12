import React from "react";
import { storiesOf } from "@storybook/react";
import useRadioGroup from "./RadioGroup.hook";

const stories = storiesOf("useRadioGroup", module);

function RadioGroupExample(props: any) {
  const radio = useRadioGroup(props);
  return (
    <div>
      {["opt1", "opt2", "opt3"].map(val => (
        <input
          type="radio"
          value={val}
          checked={radio.value === val}
          onChange={radio.onChange}
          name={radio.name}
        />
      ))}
    </div>
  );
}

stories.add("controlled radio group", () => (
  <RadioGroupExample
    defaultValue={"opt1"}
    onChange={(val: any) => console.log(val)}
  />
));
