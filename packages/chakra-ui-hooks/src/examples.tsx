import { ThemeProvider } from "@chakra-ui/theme";
import { storiesOf } from "@storybook/react";
import React from "react";
// import useCounter from "./useCounter/useCounter";
// import useNumberInput from "./useNumberInput/useNumberInput";
import {
  AccordionItemProvider,
  useAccordion,
  useAccordionButton,
  useAccordionItem,
  useAccordionPanel,
} from "./useAccordion/useAccordion";
import useCheckbox, { UseCheckboxOptions } from "./useCheckbox/useCheckbox";
import useCheckboxGroup from "./useCheckboxGroup/useCheckboxGroup";
import useDisclosure from "./useDisclosure/useDisclosure";
import useLogger from "./useLogger";
import useNativeCheckbox, {
  UseNativeCheckboxOptions,
} from "./useNativeCheckbox/useNativeCheckbox";
import useRadioGroup from "./useRadioGroup/useRadioGroup";
import { useSlider } from "./useSlider/useSlider";
import {
  TabContextProvider,
  useTab,
  useTabIndicator,
  useTabList,
  useTabPanel,
  useTabPanels,
  useTabs,
} from "./useTabs";

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

// function NumberInput() {
//   const numberInput = useNumberInput({
//     defaultValue: 1.53,
//     max: 10,
//     min: 0,
//     step: 0.1,
//     keepWithinRange: true,
//   });

//   console.log(numberInput.value);

//   return (
//     <div>
//       <div>current: {numberInput.value}</div>
//       <button tabIndex={-1} {...numberInput.incrementStepper}>
//         +
//       </button>
//       <input {...numberInput.input} />
//       <button tabIndex={-1} {...numberInput.decrementStepper}>
//         -
//       </button>
//     </div>
//   );
// }

// stories.add("useNumberInput", () => <NumberInput />);

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

function Tabs(props: any) {
  const tabs = useTabs(props);
  const context = React.useMemo(() => tabs, [tabs]);
  return (
    <TabContextProvider value={context}>{props.children}</TabContextProvider>
  );
}

const Tab = React.forwardRef(function Tab(props: any, ref: any) {
  const tab = useTab(props);
  return (
    <button ref={ref} {...tab}>
      {props.children}
    </button>
  );
});

function TabList(props: any) {
  const tablist = useTabList(props);
  return <div {...props} {...tablist} />;
}

function TabPanel(props: any) {
  const tabpanel = useTabPanel(props);
  return <div {...tabpanel}>{props.children}</div>;
}

function TabPanels(props: any) {
  const tabpanels = useTabPanels(props);
  return <React.Fragment>{tabpanels}</React.Fragment>;
}

function TabIndicator(props: any) {
  const indicator = useTabIndicator();
  return (
    <div style={{ ...indicator, height: 2, background: "red" }} {...props} />
  );
}

stories.add("useTabs", () => (
  <Tabs orientation="horizontal" isManual>
    <TabList>
      <Tab>Settings</Tab>
      <Tab isDisabled isFocusable>
        Billings
      </Tab>
      <Tab>Preferences</Tab>
      <Tab>Shut Down</Tab>
    </TabList>
    <TabIndicator />
    <TabPanels>
      <TabPanel>Settings</TabPanel>
      <TabPanel>Billings</TabPanel>
      <TabPanel>Preferences</TabPanel>
      <TabPanel>Shut Down</TabPanel>
    </TabPanels>
  </Tabs>
));

function Checkbox(props: UseCheckboxOptions & { children: React.ReactNode }) {
  const { hiddenCheckbox, checkbox } = useCheckbox(props);
  return (
    <div {...checkbox}>
      <input {...hiddenCheckbox} />
      {props.children}
    </div>
  );
}

stories.add("useCheckbox", () => (
  <Checkbox defaultIsChecked={true} isReadOnly value="wewe">
    Select Food
  </Checkbox>
));

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

stories.add("useCheckbox + group", () => <CheckExample2 />);

function NativeCheckbox(
  props: UseNativeCheckboxOptions & { children: React.ReactNode },
) {
  const { hiddenCheckbox, checkbox } = useNativeCheckbox(props);
  return (
    <label>
      <input {...hiddenCheckbox} />
      <span {...checkbox}>{props.children}</span>
    </label>
  );
}

function WithState() {
  const [checked, setChecked] = React.useState<any>(true);
  return (
    <NativeCheckbox defaultIsChecked={true} onChange={setChecked}>
      Select Food {String(checked)}
    </NativeCheckbox>
  );
}

stories.add("useNativeCheckbox", () => <WithState />);
