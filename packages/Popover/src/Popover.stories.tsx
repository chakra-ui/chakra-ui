import { Portal } from "@chakra-ui/portal";
import * as React from "react";
import { usePopover } from ".";

export default {
  title: "Popover",
};

export function PopoverExample() {
  const { trigger, popover, onClose } = usePopover();

  return (
    <>
      <button {...trigger}>Open</button>
      <div
        {...popover}
        style={{
          ...popover.style,
          background: "tomato",
          color: "white",
          padding: 30,
        }}
      >
        This is the content <br />
        <button onClick={onClose}>Close</button>
      </div>
      <div style={{ float: "right" }} tabIndex={0}>
        Other div
      </div>
    </>
  );
}
