import React from "react";
import { storiesOf } from "@storybook/react";
import VisuallyHidden from "../VisuallyHidden";
import { PropsOf } from "@chakra-ui/system";

const stories = storiesOf("VisuallyHidden", module);

stories.add("basic", () => (
  <VisuallyHidden>This is visually hidden</VisuallyHidden>
));

type InputProps = PropsOf<"input">;

// Even though, it's not visible, press `Tab`
// and use the spacebar to toggle the checked state
stories.add("with generic", () => (
  <VisuallyHidden<InputProps>
    as="input"
    type="checkbox"
    ref={node => {
      console.log(node);
    }}
    onChange={event => {
      console.log(event.target.checked);
    }}
  />
));
