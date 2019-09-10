/* eslint-disable jsx-a11y/no-autofocus */
import Portal from "@reach/portal";
import { storiesOf } from "@storybook/react";
import React, { useRef } from "react";
import FocusLock from "react-focus-lock";
import Popover, {
  PopoverCloseButton,
  PopoverContent,
  PopoverArrow,
  PopoverTrigger,
} from ".";
import Button from "../Button";
import { PopoverBody, PopoverFooter, PopoverHeader } from "./components";

const stories = storiesOf("Popover", module);

const Example = () => {
  const initRef = useRef();
  return (
    <>
      <Popover trigger="hover" initialFocusRef={initRef}>
        <PopoverTrigger>
          <Button float="right">Trigger</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Header</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Button variantColor="blue" ref={initRef}>
              Close
            </Button>
          </PopoverBody>
          <PopoverFooter>This is the footer</PopoverFooter>
        </PopoverContent>
      </Popover>
      <button>Welcome home</button>
    </>
  );
};

stories.add("Default", () => <Example />);

const PortalEx = () => {
  const initRef = useRef();
  return (
    <Popover initialFocusRef={initRef}>
      <PopoverTrigger>
        <Button float="right">Trigger</Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverHeader>Header</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Button variantColor="blue" ref={initRef}>
              Close
            </Button>
          </PopoverBody>
          <PopoverFooter>This is the footer</PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

stories.add("with portal", () => <PortalEx />);

const PortalAndFocusLockEx = () => (
  <Popover closeOnBlur={false}>
    <PopoverTrigger>
      <Button float="right">Trigger</Button>
    </PopoverTrigger>
    <Portal>
      <PopoverContent>
        <FocusLock returnFocus persistentFocus={false}>
          <PopoverHeader>Header</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Button variantColor="blue">Close</Button>
          </PopoverBody>
          <PopoverFooter>This is the footer</PopoverFooter>
        </FocusLock>
      </PopoverContent>
    </Portal>
  </Popover>
);

stories.add("with focus lock", () => <PortalAndFocusLockEx />);
