import { storiesOf } from "@storybook/react";
import React from "react";
import { InputField, SliderField, SelectField } from "../components/Field";

storiesOf("Fields", module).add("All Fields", () => (
  <div>
    <InputField label="Alt Text" />
    <SelectField
      label="Text Transform"
      options={[
        { label: "Uppercase", value: "uppercase" },
        { label: "Lowercase", value: "lowercase" },
        { label: "Capitalize", value: "capitalize" }
      ]}
    />
    <SliderField label="Top Margin" />
  </div>
));
