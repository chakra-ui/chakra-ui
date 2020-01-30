import * as React from "react";
import { storiesOf } from "@storybook/react";
import setup from "../story.setup";
import {
  BaseCombobox,
  BaseComboboxMenu,
  BaseComboboxInput,
  BaseComboboxOption,
} from "./Combobox.base";

const stories = storiesOf("Combobox", module);
stories.addDecorator(setup);

stories.add("basic", () => (
  <BaseCombobox>
    <BaseComboboxInput />
    <BaseComboboxMenu>
      <BaseComboboxOption value="java">Java</BaseComboboxOption>
      <BaseComboboxOption value="javascript">javascript</BaseComboboxOption>
    </BaseComboboxMenu>
  </BaseCombobox>
));
