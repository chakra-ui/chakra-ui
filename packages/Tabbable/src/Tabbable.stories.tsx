import { createChakra, PropsOf } from "@chakra-ui/system";
import { SafeMerge } from "@chakra-ui/utils";
import * as React from "react";
import useTabbable, { TabbableProps } from "./Tabbable.hook";

export default {
  title: "Tabbable",
};

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

export const Button_ = () => (
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
);
