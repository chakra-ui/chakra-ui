/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import InputGroup from "../InputGroup";
import Box from "../Box";
import Icon from "../Icon";
import Input from "../Input";
import Button from "../Button";
import { InputLeftAddon, InputRightAddon } from "../InputAddon";
import { InputLeftElement, InputRightElement } from "../InputElement";
import { useState } from "react";

const stories = storiesOf("Input Group", module).addDecorator(story => {
  return (
    <Box maxWidth="sm" mx="auto" mt={5}>
      {story()}
    </Box>
  );
});

const size = "md";

stories.add("with left addon", () => (
  <InputGroup size={size}>
    <InputLeftAddon>+234</InputLeftAddon>
    <Input roundedLeft="0" placeholder="Welcome" />
  </InputGroup>
));

stories.add("with right addon", () => (
  <InputGroup size={size}>
    <InputRightAddon>.com</InputRightAddon>
    <Input roundedRight="0" placeholder="Welcome" />
  </InputGroup>
));

stories.add("with left icon", () => (
  <InputGroup size={size}>
    <InputLeftElement>
      <Icon name="phone" size="1em" />
    </InputLeftElement>
    <Input placeholder="Welcome" />
  </InputGroup>
));

stories.add("with right icon", () => (
  <InputGroup size={size}>
    <InputRightElement>
      <Icon name="check" size="1em" />
    </InputRightElement>
    <Input placeholder="Welcome" />
  </InputGroup>
));

const PasswordInput = () => {
  const [show, setShow] = useState(false);
  return (
    <InputGroup size="md">
      <Input
        pr="72px"
        type={show ? "text" : "password"}
        placeholder="Enter password"
      />
      <InputRightElement width="72px" isDisabled>
        <Button size="sm" variant="link" onClick={() => setShow(!show)}>
          {show ? "HIDE" : "SHOW"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

stories.add("password input", () => <PasswordInput />);
