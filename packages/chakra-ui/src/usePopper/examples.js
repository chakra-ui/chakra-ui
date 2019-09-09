/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import React, { useState } from "react";
import usePopper from ".";

const stories = storiesOf("usePopper", module);
const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { referenceRef, popoverRef, popoverStyles } = usePopper({
    isOpen,
  });

  return (
    <>
      <button
        style={{ float: "right" }}
        onClick={() => setIsOpen(!isOpen)}
        ref={referenceRef}
      >
        Popper
      </button>
      {isOpen && (
        <ul
          ref={popoverRef}
          style={{
            background: "gray",
            margin: 0,
            padding: 0,
            width: 240,
            ...popoverStyles,
          }}
        >
          this is the content
        </ul>
      )}
    </>
  );
};

stories.add("Default", () => <App />);
