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
  ModalTransition,
} from ".";

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
          </ModalContent>
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
    const btnRef = useRef();
    return (
      <Fragment>
        <Button ref={btnRef} onClick={() => setIsOpen(true)}>
          Trigger modal
        </Button>

        <ModalTransition isOpen={isOpen}>
          {styles => (
            <Modal
              onClose={() => setIsOpen(false)}
              finalFocusRef={btnRef}
              isOpen={true}
              blockScrollOnMount={false}
              // isCentered
              useInert={false}
            >
              <ModalOverlay opacity={styles.opacity} />
              <ModalContent
                transform={styles.transform}
                opacity={styles.opacity}
                pb={5}
              >
                <ModalHeader>Login now</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Start editing to see some magic happen! HISTORY, PURPOSE AND
                  USAGE Lorem ipsum, or lipsum as it is sometimes known, is
                  dummy text used in laying out print, graphic or web designs.
                  The passage is attributed to an unknown typesetter in the 15th
                  century who is thought to have scrambled parts of Cicero's De
                  Finibus Bonorum et Malorum for use in a type specimen book. It
                  usually begins with: “Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.” The purpose of lorem ipsum is to create
                </ModalBody>
              </ModalContent>
            </Modal>
          )}
        </ModalTransition>
      </Fragment>
    );
  };

  return <SampleModal />;
});

stories.add("Chakra Modal v2", () => {
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
          // isCentered
        >
          <ModalOverlay />
          <ModalContent pb={5}>
            <ModalHeader>Login now</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Start editing to see some magic happen! HISTORY, PURPOSE AND USAGE
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text
              used in laying out print, graphic or web designs. The passage is
              attributed to an unknown typesetter in the 15th century who is
              thought to have scrambled parts of Cicero's De Finibus Bonorum et
              Malorum for use in a type specimen book. It usually begins with:
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.” The
              purpose of lorem ipsum is to create
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
              Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
              ullamco deserunt aute id consequat veniam incididunt duis in sint
              irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
              officia tempor esse quis. Sunt ad dolore quis aute consequat.
              Magna exercitation reprehenderit magna aute tempor cupidatat
              consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
              incididunt cillum quis. Velit duis sit officia eiusmod Lorem
              aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
              consectetur esse laborum eiusmod pariatur proident Lorem eiusmod
              et. Culpa deserunt nostrud ad veniam. Est velit labore esse esse
              cupidatat. Velit id elit consequat minim. Mollit enim excepteur ea
              laboris adipisicing aliqua proident occaecat do do adipisicing
              adipisicing ut fugiat. Consequat pariatur ullamco aute sunt esse.
              Irure excepteur eu non eiusmod. Commodo commodo et ad ipsum elit
              esse pariatur sit adipisicing sunt excepteur enim. Incididunt duis
              commodo mollit esse veniam non exercitation dolore occaecat ea
              nostrud laboris. Adipisicing occaecat fugiat fugiat irure fugiat
              in magna non consectetur proident fugiat. Commodo magna et aliqua
              elit sint cupidatat. Sint aute ullamco enim cillum anim ex. Est
              eiusmod commodo occaecat consequat laboris est do duis. Enim
              incididunt non culpa velit quis aute in elit magna ullamco in
              consequat ex proident. Dolore incididunt mollit fugiat pariatur
              cupidatat ipsum laborum cillum. Commodo consequat velit cupidatat
              duis ex nisi non aliquip ad ea pariatur do culpa. Eiusmod proident
              adipisicing tempor tempor qui pariatur voluptate dolor do ea
              commodo. Veniam voluptate cupidatat ex nisi do ullamco in quis
              elit. Cillum proident veniam cupidatat pariatur laborum tempor
              cupidatat anim eiusmod id nostrud pariatur tempor reprehenderit.
              Do esse ullamco laboris sunt proident est ea exercitation
              cupidatat. Do Lorem eiusmod aliqua culpa ullamco consectetur
              veniam voluptate cillum. Dolor consequat cillum tempor laboris
              mollit laborum reprehenderit reprehenderit veniam aliqua deserunt
              cupidatat consequat id. Est id tempor excepteur enim labore sint
              aliquip consequat duis minim tempor proident. Dolor incididunt
              aliquip minim elit ea. Exercitation non officia eu id. Ipsum ipsum
              consequat incididunt do aliquip pariatur nostrud. Qui ut sint
              culpa labore Lorem. Magna deserunt aliquip aute duis consectetur
              magna amet anim. Magna fugiat est nostrud veniam. Officia duis ea
              sunt aliqua. Ipsum minim officia aute anim minim aute aliquip aute
              non in non. Ipsum aliquip proident ut dolore eiusmod ad fugiat
              fugiat ut ex. Ea velit Lorem ut et commodo nulla voluptate veniam
              ea et aliqua esse id. Pariatur dolor et adipisicing ea mollit.
              Ipsum non irure proident ipsum dolore aliquip adipisicing laborum
              irure dolor nostrud occaecat exercitation. Culpa qui reprehenderit
              nostrud aliqua reprehenderit et ullamco proident nisi commodo non
              ut. Ipsum quis irure nisi sint do qui velit nisi. Sunt voluptate
              eu reprehenderit tempor consequat eiusmod Lorem irure velit duis
              Lorem laboris ipsum cupidatat. Pariatur excepteur tempor veniam
              cillum et nulla ipsum veniam ad ipsum ad aute. Est officia duis
              pariatur ad eiusmod id voluptate.
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
              Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
              ullamco deserunt aute id consequat veniam incididunt duis in sint
              irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
              officia tempor esse quis. Sunt ad dolore quis aute consequat.
              Magna exercitation reprehenderit magna aute tempor cupidatat
              consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
              incididunt cillum quis. Velit duis sit officia eiusmod Lorem
              aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
              consectetur esse laborum eiusmod pariatur proident Lorem eiusmod
              et. Culpa deserunt nostrud ad veniam. Est velit labore esse esse
              cupidatat. Velit id elit consequat minim. Mollit enim excepteur ea
              laboris adipisicing aliqua proident occaecat do do adipisicing
              adipisicing ut fugiat. Consequat pariatur ullamco aute sunt esse.
              Irure excepteur eu non eiusmod. Commodo commodo et ad ipsum elit
              esse pariatur sit adipisicing sunt excepteur enim. Incididunt duis
              commodo mollit esse veniam non exercitation dolore occaecat ea
              nostrud laboris. Adipisicing occaecat fugiat fugiat irure fugiat
              in magna non consectetur proident fugiat. Commodo magna et aliqua
              elit sint cupidatat. Sint aute ullamco enim cillum anim ex. Est
              eiusmod commodo occaecat consequat laboris est do duis. Enim
              incididunt non culpa velit quis aute in elit magna ullamco in
              consequat ex proident. Dolore incididunt mollit fugiat pariatur
              cupidatat ipsum laborum cillum. Commodo consequat velit cupidatat
              duis ex nisi non aliquip ad ea pariatur do culpa. Eiusmod proident
              adipisicing tempor tempor qui pariatur voluptate dolor do ea
              commodo. Veniam voluptate cupidatat ex nisi do ullamco in quis
              elit. Cillum proident veniam cupidatat pariatur laborum tempor
              cupidatat anim eiusmod id nostrud pariatur tempor reprehenderit.
              Do esse ullamco laboris sunt proident est ea exercitation
              cupidatat. Do Lorem eiusmod aliqua culpa ullamco consectetur
              veniam voluptate cillum. Dolor consequat cillum tempor laboris
              mollit laborum reprehenderit reprehenderit veniam aliqua deserunt
              cupidatat consequat id. Est id tempor excepteur enim labore sint
              aliquip consequat duis minim tempor proident. Dolor incididunt
              aliquip minim elit ea. Exercitation non officia eu id. Ipsum ipsum
              consequat incididunt do aliquip pariatur nostrud. Qui ut sint
              culpa labore Lorem. Magna deserunt aliquip aute duis consectetur
              magna amet anim. Magna fugiat est nostrud veniam. Officia duis ea
              sunt aliqua. Ipsum minim officia aute anim minim aute aliquip aute
              non in non. Ipsum aliquip proident ut dolore eiusmod ad fugiat
              fugiat ut ex. Ea velit Lorem ut et commodo nulla voluptate veniam
              ea et aliqua esse id. Pariatur dolor et adipisicing ea mollit.
              Ipsum non irure proident ipsum dolore aliquip adipisicing laborum
              irure dolor nostrud occaecat exercitation. Culpa qui reprehenderit
              nostrud aliqua reprehenderit et ullamco proident nisi commodo non
              ut. Ipsum quis irure nisi sint do qui velit nisi. Sunt voluptate
              eu reprehenderit tempor consequat eiusmod Lorem irure velit duis
              Lorem laboris ipsum cupidatat. Pariatur excepteur tempor veniam
              cillum et nulla ipsum veniam ad ipsum ad aute. Est officia duis
              pariatur ad eiusmod id voluptate.
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
