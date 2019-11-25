import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/theme";
import useDisclosure from "./useDisclosure";
import useCheckboxGroup from "./useCheckboxGroup";
import useRadioGroup from "./useRadioGroup";
import { useSlider } from "./useSlider";
import useLogger from "./useLogger";
import useCounter from "./useCounter";
import useNumberInput from "./useNumberInput";
import {
  useAccordion,
  useAccordionItem,
  AccordionItemProvider,
  useAccordionButton,
  useAccordionPanel,
} from "./useAccordion";

const stories = storiesOf("Hooks", module);

stories.addDecorator(story => (
  <ThemeProvider>
    {/* <CSSReset /> */}
    {story()}
  </ThemeProvider>
));

function Test() {
  const disclosure = useDisclosure({ defaultIsOpen: true });
  return (
    <>
      <button onClick={disclosure.onToggle}>Click</button>
      <p>{String(disclosure.isOpen)}</p>
    </>
  );
}

stories.add("useDisclosure", () => <Test />);

export function CheckExample(props: any) {
  const checkboxGroup = useCheckboxGroup(props);
  return (
    <div>
      {["opt1", "opt2", "opt3"].map(val => (
        <input
          type="checkbox"
          value={val}
          checked={checkboxGroup.value.includes(val)}
          onChange={checkboxGroup.onChange}
        />
      ))}
    </div>
  );
}
stories.add("useCheckboxGroup", () => (
  <CheckExample
    defaultValue={["opt1"]}
    onChange={(val: any) => console.log(val)}
  />
));

export function RadioExample(props: any) {
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

stories.add("useRadioGroup", () => (
  <RadioExample
    defaultValue={"opt1"}
    onChange={(val: any) => console.log(val)}
  />
));

export function Slider() {
  const slider = useSlider({
    defaultValue: 40,
    orientation: "vertical",
    isReversed: false,
    max: 100,
    min: 10,
    step: 1,
  });

  useLogger("Slider", slider);

  return (
    <>
      <div
        {...slider.track}
        style={{
          ...slider.track.style,
          height: 400,
          width: 50,
          background: "red",
          // maxWidth: 400,
        }}
      >
        <div
          tabIndex={0}
          {...slider.thumb}
          style={{
            ...slider.thumb.style,
            width: "100%",
            height: 20,
            background: "pink",
          }}
        />
      </div>
    </>
  );
}

stories.add("useSlider", () => <Slider />);

function Counter() {
  const counter = useCounter({
    defaultValue: 1.53,
    max: 10,
    min: 0,
    step: 0.1,
    shouldSpin: true,
    keepWithinRange: true,
  });

  return (
    <div>
      <div>current: {counter.value}</div>
      <br />
      <button
        onKeyDown={event => {
          if (event.key === "Enter" || event.key === " ") {
            counter.incOnKeyDown();
          }
        }}
        onMouseDown={counter.incOnPointerDown}
        onMouseUp={counter.stop}
        disabled={counter.isAtMax}
      >
        Increment
      </button>
      <button
        onKeyDown={event => {
          if (event.key === "Enter" || event.key === " ") {
            counter.decOnKeyDown();
          }
        }}
        onMouseDown={counter.decOnPointerDown}
        onMouseUp={counter.stop}
        disabled={counter.isAtMin}
      >
        Decrement
      </button>
    </div>
  );
}

stories.add("useCounter", () => <Counter />);

function NumberInput() {
  const numberInput = useNumberInput({
    defaultValue: 1.53,
    max: 10,
    min: 0,
    step: 0.1,
    keepWithinRange: true,
    onChange: (v: any) => console.log(v),
  });

  return (
    <div>
      <div>current: {numberInput.value}</div>
      <button tabIndex={-1} {...numberInput.incrementStepper}>
        +
      </button>
      <input {...numberInput.input} />
      <input
        type="number"
        min={-2}
        step={5}
        onChange={e => console.log(e.target.value)}
      />
      <button tabIndex={-1} {...numberInput.decrementStepper}>
        -
      </button>
    </div>
  );
}

stories.add("useNumberInput", () => <NumberInput />);

function Accordion(props: any) {
  const { FocusManager, children } = useAccordion(props);
  return <FocusManager>{children}</FocusManager>;
}

function AccordionItem(props: any) {
  const accordionItem = useAccordionItem(props);
  return (
    <AccordionItemProvider value={accordionItem}>
      <div>{props.children}</div>
    </AccordionItemProvider>
  );
}

function AccordionButton(props: any) {
  const button = useAccordionButton(props);
  return <button {...props} {...button} />;
}

function AccordionPanel(props: any) {
  const panel = useAccordionPanel(props);
  return <div {...props} {...panel} />;
}

stories.add("useAccordion", () => (
  <Accordion allowToggle>
    <AccordionItem>
      <AccordionButton>Toggle 1</AccordionButton>
      <AccordionPanel>
        Panel 1
        <Accordion>
          <AccordionItem>
            <AccordionButton>InnerButton 1</AccordionButton>
            <AccordionPanel>InnerPanel 1</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>InnerButton 2</AccordionButton>
            <AccordionPanel>InnerPanel 2</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionButton>Toggle 2</AccordionButton>
      <AccordionPanel>Panel 2</AccordionPanel>
    </AccordionItem>
  </Accordion>
));
