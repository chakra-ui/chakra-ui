import React from "react";
import { storiesOf } from "@storybook/react";
import { Popper } from ".";
import { Button } from "../Button";
import { ThemeProvider, CSSReset } from "@chakra-ui/theme";
import { useLogger } from "@chakra-ui/hooks/src";
import usePopper from "./hook";
import { Portal } from "../Portal";

const stories = storiesOf("Popper", module).addDecorator(story => (
  <ThemeProvider>
    <CSSReset />
    {story()}
  </ThemeProvider>
));

const Example = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { reference, popper } = usePopper<HTMLButtonElement, HTMLDivElement>({
    placement: "right",
  });

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <button ref={reference.ref} onClick={handleClick}>
        Toggle Popper
      </button>
      {isOpen && (
        <Portal>
          <div ref={popper.ref} style={popper.style}>
            <p>The content of the Popper.</p>
          </div>
        </Portal>
      )}
    </>
  );
};

stories.add("Default", () => <Example />);
