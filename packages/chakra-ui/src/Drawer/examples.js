import { storiesOf } from "@storybook/react";
import React, { useState } from "react";
import Drawer, { DrawerBody, DrawerFooter, DrawerHeader } from ".";
import Button from "../Button";
import FormControl from "../FormControl";
import Input from "../Input";
import Box from "../Box";
import { DrawerCloseButton } from "./components";

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
    return (
      <>
        <Drawer
          isOpen={isOpen}
          size="sm"
          placement="left"
          onClose={() => setIsOpen(false)}
        >
          <DrawerCloseButton onClick={() => {setIsOpen(false); console.log('hello')}} />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody pb={6}>
            <FormControl label="First name">
              <Input placeholder="Type here..." />
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button color="blue" onClick={() => setIsOpen(false)}>
              Save
            </Button>
          </DrawerFooter>
        </Drawer>
        <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      </>
    );
  };

  return <SampleDrawer />;
});
