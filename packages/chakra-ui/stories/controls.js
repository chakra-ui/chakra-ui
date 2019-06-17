import { storiesOf } from "@storybook/react";
import React from "react";
import Checkbox from "../src/Checkbox";
import { Box } from "../src/Layout";
import Radio from "../src/Radio";

const stories = storiesOf("Controls", module);

stories.addDecorator(story => (
  <Box maxWidth="md" mx="auto" mt={4}>
    {story()}
  </Box>
));

// stories.add("Switch", () => (
//   // eslint-disable-next-line no-console
//   <Switch onChange={e => console.log(e.target.checked)} color="green">
//     <Text fontWeight="semibold">Dark Mode</Text>
//     <Text color="gray.600" mt={1}>
//       Activate dark mode for this application
//     </Text>
//   </Switch>
// ));

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

// stories.add("ChoiceCard", () => (
//   <ChoiceCardGroup type="radio" autoSelect>
//     <ChoiceCard />
//   </ChoiceCardGroup>
// ));

// stories.add("Inline radio buttons ", () => (
//   <RadioGroup
//     name="ki"
//     inline
//     // spacing={2}
//     defaultValue="female"
//     onChange={e => console.log(e.target.value)}
//   >
//     <Radio value="male">Male</Radio>
//     <Radio value="female">Female</Radio>
//   </RadioGroup>
// ));

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
