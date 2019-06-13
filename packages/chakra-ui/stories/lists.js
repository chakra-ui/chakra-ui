import React from "react";
import { storiesOf } from "@storybook/react";
import List from "../src/List";

const stories = storiesOf("Lists", module);

stories.add("Unstyled Unordered List", () => (
  <List>
    <span>ooooooo</span>
    <span>ahhhhh</span>
    <span>Woah!</span>
  </List>
));

stories.add("Inline List", () => (
  <List inline>
    <span>ooooooo</span>
    <span>ahhhhh</span>
    <span>Woah!</span>
  </List>
));

stories.add("Styled Ordered List", () => (
  <List ordered styled spacing={4}>
    <span>ooooooo</span>
    <span>ahhhhh</span>
    <span>Woah!</span>
  </List>
));

stories.add("Styled List", () => (
  <List styled>
    <span>ooooooo</span>
    <span>ahhhhh</span>
    <span>Woah!</span>
  </List>
));

stories.add("Styled List with Spacing", () => (
  <List inline showDivider spacing={4}>
    <span>ooooooo</span>
    <span>ahhhhh</span>
    <span>Woah!</span>
  </List>
));
