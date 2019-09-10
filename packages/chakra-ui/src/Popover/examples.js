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
import Avatar from "../Avatar";
import Box from "../Box";
import Text from "../Text";
import Badge from "../Badge";
import Link from "../Link";
import { DarkMode } from "../ColorModeProvider";
import { PopoverBody, PopoverFooter, PopoverHeader } from "./components";

const stories = storiesOf("Popover", module);

const Example = () => {
  const initRef = useRef();
  return (
    <>
      <Popover initialFocusRef={initRef}>
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

function Card() {
  return (
    <DarkMode>
      <Box p={5}>
        <Avatar
          name="swyx"
          src="https://pbs.twimg.com/profile_images/990728399873232896/CMPn3IxT_reasonably_small.jpg"
        />
        <Text mt={4} fontWeight="bold">
          swyx
          <Badge ml={3} fontSize="xs">
            Follows you
          </Badge>
        </Text>
        <Text mt={3}>
          Infinite Builder working on DX @Netlify. Helping people #LearnInPublic
        </Text>
      </Box>
    </DarkMode>
  );
}

function TwitterEx() {
  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <Link href="#" color="blue.500">
          Hover to see @swyx profile
        </Link>
      </PopoverTrigger>

      <PopoverContent bg="#15202b" color="white" width="400px">
        <Card></Card>
      </PopoverContent>
    </Popover>
  );
}

stories.add("twitter hover card", () => <TwitterEx />);
