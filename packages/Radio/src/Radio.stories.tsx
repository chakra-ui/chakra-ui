import { createChakra } from "@chakra-ui/system";
import { storiesOf } from "@storybook/react";
import React from "react";
import setup from "../story.setup";
import { Radio } from "./Radio";
import { CustomRadio, RadioInput, RadioProvider } from "./Radio.hook";
import useRadioGroup from "./RadioGroup.hook";

const stories = storiesOf("Radio", module);

stories.addDecorator(setup);

function RadioGroupExample(props: any) {
  const radio = useRadioGroup(props);
  return (
    <div>
      {["Option 1", "Option 2", "Option 3"].map(opt => (
        <label>
          <input
            type="radio"
            value={opt}
            checked={radio.value === opt}
            onChange={radio.onChange}
            name={radio.name}
          />
          <span style={{ margin: 10 }}>{opt}</span>
        </label>
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

const options = ["react", "vue", "svelte"];

function UIRadio() {
  const radio = useRadioGroup({
    name: "test",
    defaultValue: "vue",
    onChange: console.log,
  });
  const isChecked = (val: string) => radio.value === val;
  return (
    <div {...radio.bind}>
      {options.map(opt => (
        <Radio
          {...radio}
          isChecked={isChecked(opt)}
          value={opt}
          variantSize="md"
          children={opt}
        />
      ))}
    </div>
  );
}

stories.add("ui radio", () => <UIRadio />);

const RadioBox = createChakra(CustomRadio);

function CompositionRadio() {
  const radio = useRadioGroup({
    name: "test",
    defaultValue: "vue",
    onChange: console.log,
  });
  const isChecked = (val: string) => radio.value === val;
  return (
    <>
      {options.map(opt => (
        <RadioProvider {...radio} value={opt} isChecked={isChecked(opt)}>
          <RadioInput />
          <RadioBox
            display="inline-block"
            border="1px solid gray"
            _checked={{ bg: "tomato", color: "white" }}
            _focus={{ outline: "3px dotted red" }}
            px={5}
            py={3}
          >
            {opt}
          </RadioBox>
        </RadioProvider>
      ))}
    </>
  );
}

stories.add("custom composition", () => <CompositionRadio />);
