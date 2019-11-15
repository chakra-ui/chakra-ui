import React, { useState, useRef } from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider, CSSReset, DarkMode } from "@chakra-ui/theme";
import {
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  PopoverBody,
  PopoverFooter,
  PopoverHeader,
} from ".";
import { Button } from "../Button";
import { Box, Text, Stack } from "@chakra-ui/layout";
import { Avatar } from "../Avatar";
import { Badge } from "../Badge";
import { Link } from "../Link";
import { ButtonGroup } from "../ButtonGroup";
import { FormControl } from "../FormControl";
import { FormLabel } from "../FormLabel";
import { Input } from "../Input";
import { IconButton } from "../IconButton";

const stories = storiesOf("Popover", module);

stories.addDecorator(story => (
  <ThemeProvider>
    <CSSReset />
    {story()}
  </ThemeProvider>
));

const Example = () => {
  return (
    <Popover closeOnBlur={false}>
      <PopoverTrigger>
        <Button mt="180px">Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverHeader>Confirmation!</PopoverHeader>
        <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

stories.add("Default", () => <Example />);

const PortalEx = () => {
  const initRef = useRef();
  return (
    <Popover
      closeOnBlur={false}
      placement="left"
      usePortal
      initialFocusRef={initRef}
    >
      <PopoverTrigger>
        <Button float="right">Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Please Confirm!</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <Box>
            Are you sure you want to delete something? This action is permanent,
            and we're totally not just flipping a field called "deleted" to
            "true" in our database, we're actually deleting something.
          </Box>
          <Button mt={4} variantColor="blue" ref={initRef}>
            Close
          </Button>
        </PopoverBody>
        <PopoverFooter>This is the footer</PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

stories.add("with portal", () => <PortalEx />);

const PortalAndFocusLockEx = () => (
  <Popover usePortal closeOnBlur={false}>
    <PopoverTrigger>
      <Button float="right">Trigger</Button>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverHeader>Header</PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody>
        <Button variantColor="blue">Close</Button>
      </PopoverBody>
      <PopoverFooter>This is the footer</PopoverFooter>
    </PopoverContent>
  </Popover>
);

stories.add("with focus lock", () => <PortalAndFocusLockEx />);

function Card() {
  return (
    //@ts-ignore
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
  <Popover usePortal defaultIsOpen closeOnBlur={false} placement="right">
    <PopoverTrigger>
      <Button>Trigger</Button>
    </PopoverTrigger>
    <PopoverContent border="0">
      <PopoverHeader borderBottom="0" bg="red.600" color="white">
        Header
        <PopoverCloseButton />
      </PopoverHeader>
      <PopoverBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore.
        <Link color="blue.500"> Learn More</Link>
      </PopoverBody>
    </PopoverContent>
  </Popover>
);

stories.add("feedback", () => <FeedbackEx />);

const WalkthroughEx = () => (
  <Popover placement="bottom" isOpen closeOnBlur={false}>
    <PopoverTrigger>
      <Button float="right">Trigger</Button>
    </PopoverTrigger>
    <PopoverContent color="white" bg="#032e61" borderColor="#032e61">
      <PopoverHeader pt={4} fontWeight="bold" border="0">
        Manage Your Channels
      </PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore.
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
  </Popover>
);

stories.add("walkthrough", () => <WalkthroughEx />);

const ConfirmationEx = () => (
  <Popover usePortal placement="right" closeOnBlur={false}>
    <PopoverTrigger>
      <Button>Delete Customer</Button>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
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
        onClose={() => setOpen(false)}
        placement="right"
        closeOnBlur={false}
        usePortal
      >
        <PopoverTrigger>
          <Button>Popover Target</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
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
        trapFocus
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton size="sm" icon="edit" aria-label="Edit" />
        </PopoverTrigger>
        <PopoverContent p={5}>
          <PopoverCloseButton />
          <Form initField={firstField} />
          <ButtonGroup mt={5} d="flex" justifyContent="flex-end">
            <Button variant="outline">Cancel</Button>
            <Button isDisabled variantColor="teal">
              Save
            </Button>
          </ButtonGroup>
        </PopoverContent>
      </Popover>
    </>
  );
};

stories.add("form with focus lock", () => <DialogForm />);
