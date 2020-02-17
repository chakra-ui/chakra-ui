import { Portal } from "@chakra-ui/portal";
import * as React from "react";
import {
  PopoverProvider,
  usePopoverContent,
  usePopoverState,
  usePopoverTrigger,
} from ".";

export default {
  title: "Popover",
};

function PopoverExample() {
  const popover = usePopoverState();
  const trigger = usePopoverTrigger();
  const content = usePopoverContent();

  return (
    <>
      <button {...trigger}>Open</button>
      <Portal>
        <div {...content}>
          This is the content <button onClick={popover.onClose}>Close</button>
        </div>
      </Portal>
    </>
  );
}

export const Default = () => (
  <PopoverProvider placement="right">
    <PopoverExample />
  </PopoverProvider>
);
