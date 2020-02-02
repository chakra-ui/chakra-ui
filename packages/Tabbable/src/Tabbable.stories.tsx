import { storiesOf } from "@storybook/react";
import * as React from "react";
import useTabbable, { TabbableProps } from "./Tabbable.hook";
import { createChakra, PropsOf } from "@chakra-ui/system";
import setup from "../story.setup";
import { SafeMerge } from "@chakra-ui/utils";

const stories = storiesOf("useTabbable", module);

stories.addDecorator(setup);

const BaseButton = React.forwardRef(
  (
    props: SafeMerge<TabbableProps, PropsOf<"button">>,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const tabbableProps = useTabbable({ ...props, ref });
    return <button {...tabbableProps} />;
  },
);

const Button = createChakra(BaseButton);

stories.add("Button", () => (
  <>
    <Button
      isDisabled
      isFocusable
      onClick={event => {
        alert("clicked");
      }}
      onMouseOver={event => {
        console.log(event);
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
