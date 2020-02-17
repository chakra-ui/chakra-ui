import * as React from "react";
import {
  BaseCombobox,
  BaseComboboxInput,
  BaseComboboxMenu,
  BaseComboboxOption,
} from "./Combobox.base";

export default {
  title: "Combobox",
};

export const Basic = () => (
  <BaseCombobox>
    <BaseComboboxInput />
    <BaseComboboxMenu>
      <BaseComboboxOption value="java">Java</BaseComboboxOption>
      <BaseComboboxOption value="javascript">javascript</BaseComboboxOption>
    </BaseComboboxMenu>
  </BaseCombobox>
);
