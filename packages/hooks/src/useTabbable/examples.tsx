import { storiesOf } from "@storybook/react";
import * as React from "react";
import useTabbable from "./useTabbable";
import { createChakra } from "@chakra-ui/system";

const stories = storiesOf("useTabbable", module);

const Button = createChakra("div", { hook: useTabbable });

stories.add("Button", () => (
  <>
    <Button
      // isDisabled
      // isFocusable
      onClick={event => {
        alert("clicked");
      }}
      onMouseOver={() => {
        console.log("over");
      }}
      onMouseEnter={() => {
        console.log("enter");
      }}
      display="inline-flex"
      _active={{ bg: "blue", color: "white" }}
      _disabled={{ opacity: 0.4, pointerEvents: "none" }}
    >
      Div Button
    </Button>

    <button
      onClick={event => {
        alert("clicked");
      }}
    >
      Native Button
    </button>
  </>
));
