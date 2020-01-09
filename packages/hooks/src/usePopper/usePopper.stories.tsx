import React from "react";
import { storiesOf } from "@storybook/react";
import usePopper from "./usePopper";
import useDisclosure from "../useDisclosure";

const stories = storiesOf("usePopper", module);

stories.add("Default", () => {
  function Component() {
    const disclosure = useDisclosure({ defaultIsOpen: true });

    const { popper, reference, arrow } = usePopper({
      placement: "left",
      shouldUpdate: disclosure.isOpen,
    });

    return (
      <>
        <button
          onClick={disclosure.onToggle}
          style={{ float: "right" }}
          {...reference}
        >
          Reference
        </button>
        <div
          hidden={!disclosure.isOpen}
          {...popper}
          style={{ ...popper.style, background: "red", padding: 15 }}
        >
          <div {...arrow} style={{ ...arrow.style, background: "inherit" }} />
          Popper
        </div>
      </>
    );
  }
  return <Component />;
});
