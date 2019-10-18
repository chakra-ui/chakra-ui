import { storiesOf } from "@storybook/react";
import React, { useState, Fragment, useRef } from "react";
import Box from "../Box";
import Button from "../Button";
import FormControl from "../FormControl";
import Input from "../Input";
import FormLabel from "../FormLabel";
import CloseButton from "../CloseButton";
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../Modal";
import Lorem from "react-lorem-component";
import { SlideIn, Scale } from "../Transition";

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
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>

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
          </ModalContent>
        </Modal>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      </Fragment>
    );
  };

  return <SampleModal />;
});

stories.add("with slide transition", () => {
  const SampleModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const btnRef = useRef();
    return (
      <Fragment>
        <Button ref={btnRef} onClick={() => setIsOpen(true)}>
          Trigger modal
        </Button>
        <SlideIn offset="10px" in={isOpen}>
          {styles => (
            <Modal
              isOpen={true}
              onClose={() => setIsOpen(false)}
              finalFocusRef={btnRef}
            >
              <ModalOverlay opacity={styles.opacity} />
              <ModalContent {...styles} pb={5}>
                <ModalHeader>Login now</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Lorem count={2} />
                </ModalBody>
              </ModalContent>
            </Modal>
          )}
        </SlideIn>
      </Fragment>
    );
  };

  return <SampleModal />;
});

stories.add("with preserve scrollbar", () => {
  const SampleModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const btnRef = useRef();
    return (
      <Fragment>
        <Button ref={btnRef} onClick={() => setIsOpen(true)}>
          Trigger modal
        </Button>
        <Lorem count={5} />
        <SlideIn offset="10px" in={isOpen}>
          {styles => (
            <Modal
              isOpen={true}
              onClose={() => setIsOpen(false)}
              finalFocusRef={btnRef}
              preserveScrollBarGap
            >
              <ModalOverlay opacity={styles.opacity} />
              <ModalContent {...styles} pb={5}>
                <ModalHeader>Login now</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Lorem count={2} />
                </ModalBody>
              </ModalContent>
            </Modal>
          )}
        </SlideIn>
      </Fragment>
    );
  };

  return <SampleModal />;
});

stories.add("with scale transition", () => {
  const SampleModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const btnRef = useRef();
    return (
      <Fragment>
        <Button ref={btnRef} onClick={() => setIsOpen(true)}>
          Trigger modal
        </Button>
        <Scale in={isOpen}>
          {styles => (
            <Modal
              isOpen={true}
              onClose={() => setIsOpen(false)}
              finalFocusRef={btnRef}
            >
              <ModalOverlay opacity={styles.opacity} />
              <ModalContent {...styles} pb={5}>
                <ModalHeader>Login now</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Lorem count={2} />
                </ModalBody>
              </ModalContent>
            </Modal>
          )}
        </Scale>
      </Fragment>
    );
  };

  return <SampleModal />;
});

stories.add("Basic usage", () => {
  const SampleModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Fragment>
        <Button onClick={() => setIsOpen(true)}>Trigger modal</Button>

        <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent pb={5}>
            <ModalHeader>Login now</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Lorem count={2} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Fragment>
    );
  };

  return <SampleModal />;
});

stories.add("Scroll inside", () => {
  const SampleModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const btnRef = useRef();
    return (
      <Fragment>
        <Button ref={btnRef} onClick={() => setIsOpen(true)}>
          Trigger modal
        </Button>

        <Modal
          onClose={() => setIsOpen(false)}
          finalFocusRef={btnRef}
          isOpen={isOpen}
          blockScrollOnMount
          isCentered
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Lorem size={5} />
            </ModalBody>
            <ModalFooter>
              <Button>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Fragment>
    );
  };

  return <SampleModal />;
});
stories.add("Scroll outside", () => {
  const SampleModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const btnRef = useRef();
    return (
      <Fragment>
        <Button ref={btnRef} onClick={() => setIsOpen(true)}>
          Trigger modal
        </Button>

        <Modal
          onClose={() => setIsOpen(false)}
          finalFocusRef={btnRef}
          isOpen={isOpen}
          blockScrollOnMount
          scrollBehavior="outside"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Lorem size={5} />
            </ModalBody>
            <ModalFooter>
              <Button>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Fragment>
    );
  };

  return <SampleModal />;
});

stories.add("close on overlay click", () => {
  function ManualClose() {
    const [isOpen, setIsOpen] = React.useState(false);
    const close = () => setIsOpen(false);
    const open = () => setIsOpen(true);

    return (
      <>
        <Button onClick={open}>Open Modal</Button>

        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={close}>
          <ModalOverlay zIndex={7} />
          <ModalContent zIndex={8}>
            <ModalHeader onClose={close}>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Lorem count={2} />
            </ModalBody>

            <ModalFooter>
              <Button variantColor="blue" mr={3}>
                Save
              </Button>
              <Button onClick={close}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return <ManualClose />;
});

stories.add("initial and final focus ref", () => {
  function InitialFocus() {
    const [isOpen, setIsOpen] = React.useState(false);
    const close = () => setIsOpen(false);
    const open = () => setIsOpen(true);
    const initialRef = React.useRef();
    const finalRef = React.useRef();

    return (
      <>
        <Button onClick={open}>Open Modal</Button>
        <Button ml={4} ref={finalRef}>
          I'll receive focus on close
        </Button>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={close}
        >
          <ModalOverlay zIndex={7} />
          <ModalContent zIndex={8}>
            <ModalHeader onClose={close}>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input ref={initialRef} placeholder="First name" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Last name</FormLabel>
                <Input placeholder="Last name" />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variantColor="blue" mr={3}>
                Save
              </Button>
              <Button onClick={close}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return <InitialFocus />;
});
