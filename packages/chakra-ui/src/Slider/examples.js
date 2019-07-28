/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Slider, { SliderThumb, SliderTrack, SliderFilledTrack } from ".";

const stories = storiesOf("Slider", module);

stories.add("Default", () => (
  <Slider>
    <SliderTrack />
    <SliderFilledTrack />
    <SliderThumb />
  </Slider>
));
