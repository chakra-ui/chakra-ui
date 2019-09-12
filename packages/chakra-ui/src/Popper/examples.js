/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Popper from ".";
import Fade from "./Fade";
import Box from "../Box";

const stories = storiesOf("Popper", module);

const Example = () => {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef();

  function handleClick() {
    setOpen(!open);
  }

  return (
    <div>
      <button ref={buttonRef} onClick={handleClick}>
        Toggle Popper
      </button>
      <Popper
        placement="right"
        isOpen={open}
        anchorEl={buttonRef.current}
        willUseTransition
      >
        {({ transition }) => (
          <Fade {...transition} timeout={350}>
            <Box>
              <p>The content of the Popper.</p>
            </Box>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

stories.add("Default", () => <Example />);
