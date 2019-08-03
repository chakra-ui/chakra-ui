import { storiesOf } from "@storybook/react";
import React, { useState, Fragment } from "react";
import Box from "../Box";
import Button from "../Button";
import FormControl from "../FormControl";
import Input from "../Input";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "../Modal";
import FormLabel from "../FormLabel";
import CloseButton from "../CloseButton";

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
    const close = () => setIsOpen(false);
    return (
      <Fragment>
        <Modal isOpen={isOpen} onClose={close}>
          <ModalHeader onClose={close}>Create your account</ModalHeader>

          <CloseButton
            onClick={close}
            position="absolute"
            top="8px"
            right="12px"
          />

          <ModalBody pb={6}>
            <FormControl mb={4}>
              <FormLabel>First name</FormLabel>
              <Input placeholder="Type here..." />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={close}>
              Cancel
            </Button>
            <Button color="blue" onClick={close}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      </Fragment>
    );
  };

  return <SampleModal />;
});
