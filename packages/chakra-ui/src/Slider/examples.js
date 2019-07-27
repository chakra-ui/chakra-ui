/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import SliderInput from "./SliderInput";
import { select, boolean } from "@storybook/addon-knobs";
import Slider from "./Slider";
import NumberInput from "../NumberInput";

const stories = storiesOf("Slider", module);

stories.add("Default", () => (
  <SliderInput
    max={50}
    defaultValue={25}
    min={0}
    size={select("Size", ["sm", "md", "lg"], "md")}
    isDisabled={boolean("isDisabled", false)}
  >
    <Slider />
    <NumberInput wrapperProps={{ ml: 4, flex: "0 0 auto", minWidth: 80 }} />
  </SliderInput>
));
