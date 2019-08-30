/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import CheckboxGroup from ".";
import Checkbox from "../Checkbox";

const stories = storiesOf("CheckboxGroup", module);
stories.add("Default", () => (
  <CheckboxGroup color="green" defaultValue={["two"]}>
    <Checkbox value="one">One</Checkbox>
    <Checkbox value="two">Two</Checkbox>
    <Checkbox value="three">Three</Checkbox>
  </CheckboxGroup>
));
