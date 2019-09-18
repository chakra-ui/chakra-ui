import { storiesOf } from "@storybook/react";
import React, { useState, Fragment, useRef } from "react";
import Box from "../Box";
import Button from "../Button";
import FormControl from "../FormControl";
import Input from "../Input";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "../Modal";
import FormLabel from "../FormLabel";
import CloseButton from "../CloseButton";
import { ModalOverlay, ModalContent } from "./v2";

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
    const firstField = useRef();
    return (
      <Fragment>
        <Modal initialFocusRef={firstField} isOpen={isOpen} onClose={close}>
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
              <Input ref={firstField} placeholder="Type here..." />
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

stories.add("Chakra Modal", () => {
  const SampleModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    // const close = () => setIsOpen(false);
    const btnRef = useRef();
    return (
      <Fragment>
        <Button onClick={() => setIsOpen(true)}>Trigger modal</Button>
        <ModalOverlay
          initialFocusRef={btnRef}
          returnFocusOnClose
          onClose={() => {
            setIsOpen(false);
          }}
          isOpen={isOpen}
          lockBodyScroll
        >
          <ModalContent>
            <p>
              Start editing to see some magic happen! HISTORY, PURPOSE AND USAGE
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text
              used in laying out print, graphic or web designs. The passage is
              attributed to an unknown typesetter in the 15th century who is
              thought to have scrambled parts of Cicero's De Finibus Bonorum et
              Malorum for use in a type specimen book. It usually begins with:
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.” The
              purpose of lorem ipsum is to create a natural looking block of
              text (sentence, paragraph, page, etc.) that doesn't distract from
              the layout. A practice not without controversy, laying out pages
              with meaningless filler text can be very useful when the focus is
              meant to be on design, not content. The passage experienced a
              surge in popularity during the 1960s when Letraset used it on
              their dry-transfer sheets, and again during the 90s as desktop
              publishers bundled the text with their software. Today it's seen
              all around the web; on templates, websites, and stock designs. Use
              our generator to get your own, or read on for the authoritative
              history of lorem ipsum. Start editing to see some magic happen!
              HISTORY, PURPOSE AND USAGE Lorem ipsum, Start editing to see some
              magic happen! HISTORY, PURPOSE AND USAGE Lorem ipsum, or lipsum as
              it is sometimes known, is dummy text used in laying out print,
              graphic or web designs. The passage is attributed to an unknown
              typesetter in the 15th century who is thought to have scrambled
              parts of Cicero's De Finibus Bonorum et Malorum for use in a type
              specimen book. It usually begins with: “Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.” The purpose of lorem
              ipsum is to create a natural looking block of text (sentence,
              paragraph, page, etc.) that doesn't distract from the layout. A
              practice not without controversy, laying out pages with
              meaningless filler text can be very useful when the focus is meant
              to be on design, not content. The passage experienced a surge in
              popularity during the 1960s when Letraset used it on their
              dry-transfer sheets, and again during the 90s as desktop
              publishers bundled the text with their software. Today it's seen
              all around the web; on templates, websites, and stock designs. Use
              our generator to get your own, or read on for the authoritative
              history of lorem ipsum. Start editing to see some magic happen!
              HISTORY, PURPOSE AND USAGE Lorem ipsum,
            </p>
            <Button ref={btnRef}>Button of life</Button>
          </ModalContent>
        </ModalOverlay>
      </Fragment>
    );
  };

  return <SampleModal />;
});
