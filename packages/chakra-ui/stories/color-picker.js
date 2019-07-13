import React from "react";
import { storiesOf } from "@storybook/react";
import {
  ColorPicker,
  ColorList,
  ColorInput,
  ColorItem,
  ColorSwatch,
  GradientSwatch
} from "../src/ColorPicker";
import { Box } from "../src/Layout";

const stories = storiesOf("Color Picker", module);

stories.add("Default", () => (
  <ColorList px="12px" selectedColor="rgb(11, 130, 76)">
    <ColorItem color="rgba(238, 19, 19, 0.5)" />
    <ColorItem color="rgb(17, 204, 119)" />
    <ColorItem color="rgb(11, 130, 76)" />
  </ColorList>
));

stories.add("Color Picker", () => (
  <ColorPicker selectedColor="rgb(11, 130, 76)" />
));

stories.add("Color Input", () => (
  <Box maxWidth="240px" mt={5} mx="auto">
    <ColorInput value="rgba(238, 19, 19, 0.5)" />
    <ColorSwatch
      border="2px solid #fff"
      width="200px"
      height="40px"
      color="rgba(238, 19, 19, 0.5)"
    />
    <GradientSwatch
      angle="to top right"
      startColor="#2d3e50 45%"
      endColor="#ffffff"
      isSelected
    />
    <GradientSwatch angle="-225deg" startColor="#f2545b" endColor="#f9aabe" />
    <GradientSwatch gradient="linear-gradient(-225deg, rgb(242, 84, 91), rgb(249, 170, 190))" />
  </Box>
));
