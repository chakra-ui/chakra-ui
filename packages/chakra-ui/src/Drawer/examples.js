import { storiesOf } from "@storybook/react";
import React, { useState, Fragment, useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from ".";
import Button from "../Button";
import Input from "../Input";
import Box from "../Box";

const stories = storiesOf("Drawer", module);
stories.addDecorator(story => {
  return (
    <Box maxWidth="lg" mx="auto" mt={6} p={6}>
      {story()}
    </Box>
  );
});

stories.add("Default", () => {
  const SampleDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const btnRef = useRef();
    return (
      <Fragment>
        <Button ref={btnRef} onClick={() => setIsOpen(true)}>
          Open Drawer
        </Button>

        <Drawer
          isOpen={isOpen}
          // size="xl"
          placement="right"
          onClose={() => setIsOpen(false)}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay bg="tomato" />
          <DrawerContent pos="fixed">
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
              <Input placeholder="Type here..." />
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button color="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Fragment>
    );
  };

  return <SampleDrawer />;
});
