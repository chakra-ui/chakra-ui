import React from "react";
import { storiesOf } from "@storybook/react";
import useLiveRegion from "./live-region.hook";

const stories = storiesOf("Live Region", module);

function Example() {
  const region = useLiveRegion();
  return (
    <button
      onClick={() => {
        region.speak("Filtering categories was successful");
      }}
    >
      Click me
    </button>
  );
}

stories.add("polite", () => <Example />);
