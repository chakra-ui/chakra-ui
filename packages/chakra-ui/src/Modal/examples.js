import { storiesOf } from "@storybook/react";
import React, { useState } from "react";
import Box from "../Box";
import Button from "../Button";
import FormControl from "../FormControl";
import Input from "../Input";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "../Modal";
import FormLabel from "../FormLabel";

const stories = storiesOf("Modal", module);
stories.addDecorator(story => {
  return (
    <Box maxWidth="lg" mx="auto" mt={6} p={6}>
      {story()}
    </Box>
  );
});

stories.add("Default", () => {
  const SampleModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ModalHeader onClose={() => setIsOpen(false)}>
            Create your account
          </ModalHeader>

          <ModalBody pb={6}>
            <FormControl mb={4}>
              <FormLabel>First name</FormLabel>
              <Input placeholder="Type here..." />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button color="blue" onClick={() => setIsOpen(false)}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      </>
    );
  };

  return <SampleModal />;
});
