/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import FormControl, { FormLabel, HelperMessage } from ".";
import InputAddon from "../InputAddon";
import Input from "../Input";

const stories = storiesOf("FormControl", module);

stories.add("Default", () => (
  <FormControl id="boo">
    <FormLabel>How much you wan buy am?</FormLabel>
    <InputAddon text="$" position="left">
      <Input placeholder="Welcome" />
    </InputAddon>
    <HelperMessage>Ensure its in USD</HelperMessage>
  </FormControl>
));
