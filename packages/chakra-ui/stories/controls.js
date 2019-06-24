import { storiesOf } from "@storybook/react";
import React from "react";
import Checkbox from "../src/Checkbox";
import { Box } from "../src/Layout";
import Radio from "../src/Radio";
import Switch from "../src/Switch";
import Text from "../src/Text";
import { Label } from "../src/FormControl";
import { UIModeProvider } from "../src/ThemeProvider";
import List from "../src/List";
import RadioGroup, { RadioButtonGroup } from "../src/RadioGroup";
import Button from "../src/Button";

const stories = storiesOf("Controls", module);

stories.addDecorator(story => {
  return (
    <>
      <Box maxWidth="lg" mx="auto" mt={6} p={6}>
        {story("light")}
      </Box>

      <br />
      <UIModeProvider value="dark">
        <Box bg="gray.800" maxWidth="lg" mx="auto" mt={6} p={6}>
          {story("dark")}
        </Box>
      </UIModeProvider>
    </>
  );
});

stories.add("Switch", mode => (
  <List inline>
    <Switch
      size="sm"
      onChange={e => console.log(e.target.checked)}
      color="green"
    />
    <Switch
      size="md"
      onChange={e => console.log(e.target.checked)}
      color="blue"
    />
    <Switch
      size="lg"
      onChange={e => console.log(e.target.checked)}
      color="cyan"
    />
  </List>
));

stories.add("Checkbox", () => (
  <React.Fragment>
    <Box bg="gray.700" p={2}>
      <Checkbox isDisabled isChecked mode="dark">
        Disabled and Checked
      </Checkbox>
    </Box>
    <Checkbox isDisabled>Disabled </Checkbox>
    <br />
    <Checkbox />
    <br />
    {["red", "teal", "cyan"].map(color => (
      <>
        <Checkbox color={color} />
        <br />
      </>
    ))}
  </React.Fragment>
));

// stories.add("Inline Checkbox", () => (
//   <React.Fragment>
//     <CheckboxGroup
//       inline
//       color="green"
//       mode="dark"
//       bg="gray.800"
//       p="24px"
//       size="sm"
//     >
//       <Checkbox defaultChecked>Do</Checkbox>
//       <Checkbox>Do not</Checkbox>
//       <Checkbox indeterminate={true}>Try</Checkbox>
//     </CheckboxGroup>

//     <CheckboxGroup inline color="blue" p="24px">
//       <Checkbox defaultChecked>Do</Checkbox>
//       <Checkbox>Do not</Checkbox>
//       <Checkbox indeterminate={true}>Try</Checkbox>
//     </CheckboxGroup>
//   </React.Fragment>
// ));

stories.add("Radio", () => (
  <React.Fragment>
    <Radio value="male" name="bee" isDisabled>
      Male
    </Radio>
    <Checkbox isDisabled>Disabled </Checkbox>
    <br />
    <br />
    <Radio value="female" name="bee" defaultChecked>
      Female
    </Radio>
    <Checkbox defaultChecked>Disabled </Checkbox>
    <br />
    <br />
    <Radio value="female" name="bee" defaultChecked isDisabled>
      Complex
    </Radio>
    <Checkbox defaultChecked isDisabled>
      Disabled{" "}
    </Checkbox>
  </React.Fragment>
));

stories.add("Radio Button Group Ex", () => {
  const Radio = React.forwardRef((props, ref) => {
    const { isChecked, isDisabled, ...rest } = props;
    return (
      <Button
        ref={ref}
        color={isChecked ? "red" : "gray"}
        aria-checked={isChecked}
        role="radio"
        isDisabled={isDisabled}
        {...rest}
      />
    );
  });

  return (
    <RadioButtonGroup>
      <Radio value="rad1">Radio 1</Radio>
      <Radio value="rad2" isDisabled>
        Radio 2
      </Radio>
      <Radio value="rad3">Radio 3</Radio>
    </RadioButtonGroup>
  );
});

// stories.add("ChoiceCard", () => (
//   <ChoiceCardGroup type="radio" autoSelect>
//     <ChoiceCard />
//   </ChoiceCardGroup>
// ));

stories.add("Inline radio buttons ", () => (
  <RadioGroup
    // name="ki"
    // inline
    // spacing={2}
    defaultValue="male"
    onChange={value => console.log(value)}
  >
    <Radio value="male">Male</Radio>
    <Radio value="female">Female</Radio>
  </RadioGroup>
));

// stories.add("Disabled radio buttons ", () => (
//   <RadioGroup
//     name="ki"
//     defaultValue="female"
//     onChange={e => console.log(e.target.value)}
//   >
//     <Radio value="male" isDisabled>
//       Male
//     </Radio>
//     <Radio value="female" isDisabled>
//       Female
//     </Radio>
//   </RadioGroup>
// ));

// stories.add("Choice Card", () => (
//   <ChoiceGroup
//     showCheckmark
//     isFullWidth
//     defaultValue={"figma"}
//     type="radio"
//     // inline
//     // name="stab"
//     spacing={2}
//   >
//     <ChoiceCard value="invision">Invision</ChoiceCard>
//     <ChoiceCard value="sketch">Sketch</ChoiceCard>
//     {/* <Text>Welcome Home</Text> */}
//     <ChoiceCard value="figma">Figma</ChoiceCard>
//   </ChoiceGroup>
// ));

// stories.add("Segmented Controls", () => (
//   <Box p="40px" maxWidth="400px" mx="auto" mt="90px">
//     <FormControl label="What software do you use?">
//       <SegmentedControl defaultValue="figma">
//         <SegmentedControl.Item value="invision">Invision</SegmentedControl.Item>
//         <SegmentedControl.Item value="sketch">Sketch</SegmentedControl.Item>
//         <SegmentedControl.Item value="figma">Figma</SegmentedControl.Item>
//       </SegmentedControl>
//     </FormControl>
//   </Box>
// ));
