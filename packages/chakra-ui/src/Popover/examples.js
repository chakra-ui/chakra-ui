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
import ButtonGroup from "../ButtonGroup";
import { DarkMode } from "../ColorModeProvider";
import { PopoverBody, PopoverFooter, PopoverHeader } from "./components";

const stories = storiesOf("Popover", module);

const Example = () => {
  const initRef = useRef();
  return (
    <>
      <Popover
        defaultIsOpen
        closeOnBlur={false}
        placement="right"
        initialFocusRef={initRef}
      >
        <PopoverTrigger>
          <Button mt="180px">Trigger</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Header</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Button variantColor="blue" ref={initRef}>
              Button
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
        <PopoverContent hasArrow={false}>
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

const FeedbackEx = () => (
  <Popover defaultIsOpen closeOnBlur={false}>
    <PopoverTrigger>
      <Button>Trigger</Button>
    </PopoverTrigger>
    <Portal>
      <PopoverContent border="0" hasArrow={false}>
        <PopoverHeader borderBottom="0" bg="red.600" color="white">
          Header
          <PopoverCloseButton />
        </PopoverHeader>
        <PopoverBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore.
          <Link color="blue.500"> Learn More</Link>
        </PopoverBody>
      </PopoverContent>
    </Portal>
  </Popover>
);

stories.add("feedback", () => <FeedbackEx />);

const WalkthroughEx = () => (
  <Popover placement="bottom" isOpen closeOnBlur={false}>
    <PopoverTrigger>
      <Button float="right">Trigger</Button>
    </PopoverTrigger>
    <Portal>
      <PopoverContent color="white" bg="#032e61" borderColor="#032e61">
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          Manage Your Channels
        </PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore.
        </PopoverBody>
        <PopoverFooter
          border="0"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        >
          <Box fontSize="sm">Step 2 of 4</Box>
          <ButtonGroup size="sm">
            <Button variantColor="green">Setup Email</Button>
            <Button variantColor="blue">Next</Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Portal>
  </Popover>
);

stories.add("walkthrough", () => <WalkthroughEx />);
