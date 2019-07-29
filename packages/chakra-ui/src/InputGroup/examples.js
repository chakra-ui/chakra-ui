/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import InputGroup from ".";
import Select from "../Select";
import Input from "../Input";
import Button from "../Button";

const stories = storiesOf("Input Group", module);

stories.add("Default", () => (
  <InputGroup size="md">
    <Select wrapperProps={{ minWidth: "90px" }}>
      <option value="dollars">Dollars</option>
      <option value="naira">Naira</option>
    </Select>
    <Input flex="1" />
    <Button color="cyan">Submit</Button>
  </InputGroup>
));
