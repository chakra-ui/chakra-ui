import { chakra } from "@chakra-ui/system";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import Input from "./Input";
import { InputLeftAddon, InputRightAddon } from "./Input.addon";
import { InputLeftElement, InputRightElement } from "./Input.element";
import InputGroup from "./Input.group";

const stories = storiesOf("Input", module);

stories.addDecorator(story => (
  <chakra.div maxW="560px" mx="auto" mt="40px">
    {story()}
  </chakra.div>
));

stories.add("states", () => (
  <>
    <Input placeholder="Idle" />
    <br />
    <Input isInvalid placeholder="isInvalid" />
    <br />
    <Input isDisabled placeholder="isDisabled" />
    <br />
    <Input isReadOnly placeholder="isReadonly" />
  </>
));

stories.add("variants", () => (
  <>
    <Input variant="outline" placeholder="Outline" />
    <br />
    <Input variant="filled" placeholder="Filled" />
    <br />
    <Input variant="flushed" placeholder="Flushed" />
    <br />
    <Input variant="unstyled" placeholder="Unstyled" />
  </>
));

stories.add("left and right addon", () => (
  <>
    <InputGroup>
      <InputLeftAddon children="+234" />
      <Input roundedLeft="0" placeholder="Phone number..." />
    </InputGroup>

    <br />

    <InputGroup variantSize="sm">
      <InputLeftAddon children="https://" />
      <Input rounded="0" placeholder="website.com" />
      <InputRightAddon children=".com" />
    </InputGroup>
  </>
));

stories.add("element inside input", () => (
  <>
    <InputGroup>
      <InputLeftElement children={"P"} />
      <Input type="phone" placeholder="Phone number" />
    </InputGroup>

    <InputGroup>
      <InputLeftElement color="gray.300" fontSize="1.2em" children="$" />
      <Input placeholder="Enter amount" />
      <InputRightElement children={"C"} />
    </InputGroup>
  </>
));

function PasswordInput() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup variantSize="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Enter password"
      />
      <InputRightElement width="4.5rem">
        <chakra.button h="1.75rem" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </chakra.button>
      </InputRightElement>
    </InputGroup>
  );
}

stories.add("password input", () => <PasswordInput />);

stories.add("changing the focus & error border color", () => (
  <>
    <Input focusBorderColor="lime" placeholder="Here is a sample placeholder" />
    <br />
    <Input
      focusBorderColor="pink.400"
      placeholder="Here is a sample placeholder"
    />
    <br />
    <Input
      isInvalid
      errorBorderColor="red.300"
      placeholder="Here is a sample placeholder"
    />
    <br />
    <Input
      isInvalid
      errorBorderColor="crimson"
      placeholder="Here is a sample placeholder"
    />
    <br />
  </>
));
