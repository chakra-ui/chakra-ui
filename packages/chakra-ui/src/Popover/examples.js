/* eslint-disable jsx-a11y/no-autofocus */
import Portal from "@reach/portal";
import { storiesOf } from "@storybook/react";
import React, { useRef, useState } from "react";
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
import Icon from "../Icon";
import ButtonGroup from "../ButtonGroup";
import { DarkMode } from "../ColorModeProvider";
import { PopoverBody, PopoverFooter, PopoverHeader } from "./components";
import Stack from "../Stack";
import FormControl from "../FormControl";
import FormLabel from "../FormLabel";
import Input from "../Input";
import IconButton from "../IconButton";

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
  <Popover defaultIsOpen closeOnBlur={false} placement="right">
    <PopoverTrigger>
      <Button>Trigger</Button>
    </PopoverTrigger>
    <Portal>
      <PopoverContent border="0">
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
        <PopoverArrow />
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

const ConfirmationEx = () => (
  <Popover placement="right" closeOnBlur={false}>
    <PopoverTrigger>
      <Button>Delete Customer</Button>
    </PopoverTrigger>
    <Portal>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          Are you sure you want to continue with your action?
        </PopoverBody>
        <PopoverFooter d="flex" justifyContent="flex-end">
          <ButtonGroup size="sm">
            <Button variant="outline">Cancel</Button>
            <Button variantColor="red">Apply</Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Portal>
  </Popover>
);

stories.add("confirmation", () => <ConfirmationEx />);

const CustomTargetEx = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(!open)}>Trigger Popover</Button>
      <Popover
        returnFocusOnClose={false}
        isOpen={open}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button>Popover Target</Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              Are you sure you want to continue with your action?
            </PopoverBody>
            <PopoverFooter d="flex" justifyContent="flex-end">
              <ButtonGroup size="sm">
                <Button variant="outline">Cancel</Button>
                <Button variantColor="red">Apply</Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
};

stories.add("custom target", () => <CustomTargetEx />);

function Form({ initField, ...props }) {
  return (
    <Stack {...props}>
      <FormControl>
        <FormLabel htmlFor="fname">First name</FormLabel>
        <Input ref={initField} id="fname" defaultValue="John" />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="lname">Last name</FormLabel>
        <Input id="lname" defaultValue="Smith" />
      </FormControl>
    </Stack>
  );
}

const DialogForm = () => {
  const [open, setOpen] = useState(false);
  const firstField = useRef(null);
  return (
    <>
      <Box d="inline-block" mr={3}>
        John Smith
      </Box>
      <Popover
        isOpen={open}
        initialFocusRef={firstField}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton size="sm" icon="edit" />
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <Form initField={firstField} />
            <ButtonGroup mt={5} d="flex" justifyContent="flex-end">
              <Button variant="outline">Cancel</Button>
              <Button isDisabled variantColor="teal">
                Save
              </Button>
            </ButtonGroup>
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};

stories.add("form with focus lock", () => <DialogForm />);
