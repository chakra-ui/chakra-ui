import { storiesOf } from "@storybook/react";
import React from "react";
import Modal, { ModalHeader, ModalBody, ModalFooter } from "../src/Modal";
import FormControl from "../src/FormControl";
import Input from "../src/Input";
import Button, { ActionButtons } from "../src/Button";
import { Component } from "../src/Component";
import { Box } from "../src/Layout";
import Drawer, { DrawerHeader, DrawerBody, DrawerFooter } from "../src/Drawer";
import Popover from "../src/Popover";
import {
  PopoverHeader,
  PopoverBody,
  PopoverFooter
} from "../src/Popover/components";
import Tooltip from "../src/Tooltip";

const stories = storiesOf("Overlays", module);
stories.addDecorator(story => {
  return (
    <Box maxWidth="lg" mx="auto" mt={6} p={6}>
      {story()}
    </Box>
  );
});

stories.add("Modal", () => {
  return (
    <Component initialState={{ isOpen: false }}>
      {({ state, setState }) => (
        <>
          <Modal
            isOpen={state.isOpen}
            onClose={() => setState({ isOpen: false })}
          >
            <ModalHeader onClose={() => setState({ isOpen: false })}>
              Create your account
            </ModalHeader>

            <ModalBody pb={6}>
              <FormControl label="First name" mb={4}>
                <Input placeholder="Type here..." />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <ActionButtons onCancel={() => setState({ isOpen: false })} />
            </ModalFooter>
          </Modal>
          <Button onClick={() => setState({ isOpen: true })}>Open Modal</Button>
        </>
      )}
    </Component>
  );
});

stories.add("Drawer", () => {
  return (
    <Component initialState={{ isOpen: false }}>
      {({ state, setState }) => (
        <>
          <Drawer
            isOpen={state.isOpen}
            placement="left"
            onClose={() => setState({ isOpen: false })}
          >
            <DrawerHeader
              showCloseButton
              onClose={() => setState({ isOpen: false })}
            >
              Create your account
            </DrawerHeader>

            <DrawerBody pb={6}>
              <FormControl label="First name">
                <Input placeholder="Type here..." />
              </FormControl>
            </DrawerBody>
            <DrawerFooter>
              <ActionButtons onCancel={() => setState({ isOpen: false })} />
            </DrawerFooter>
          </Drawer>
          <Button onClick={() => setState({ isOpen: true })}>
            Open Drawer
          </Button>
        </>
      )}
    </Component>
  );
});

stories.add("Popover", () => (
  <>
    <Popover
      trigger={<Button>Trigger</Button>}
      usePortal
      placement="right"
      // trapFocus
      showCloseButton
    >
      {props => (
        <>
          <PopoverHeader>Header</PopoverHeader>
          <PopoverBody>
            <Button color="blue" onClick={props.onClose}>
              Close
            </Button>
          </PopoverBody>
          <PopoverFooter>This is the footer</PopoverFooter>
        </>
      )}
    </Popover>
    <Button color="green">Content Inside</Button>
  </>
));

stories.add("Tooltip", () => (
  <>
    <Tooltip label="Welcome home" placement="right" closeOnClick>
      <Button variant="solid" color="blue">
        Close
      </Button>
    </Tooltip>
  </>
));
