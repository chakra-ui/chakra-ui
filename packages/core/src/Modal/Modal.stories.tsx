import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Modal, ModalOverlay, ModalDialog } from "./Modal";
import setup from "../story.setup";
import { useDisclosure } from "@chakra-ui/hooks";
import { Layer } from "../Layers";

const stories = storiesOf("Modal", module);

stories.addDecorator(setup);

const Overlay = (props: any) => (
  <ModalOverlay
    pos="fixed"
    bg="rgba(0,0,0,0.4)"
    left="0"
    top="0"
    w="100vw"
    h="100vh"
    {...props}
  />
);

const Dialog = (props: any) => (
  <ModalDialog
    bg="white"
    color="black"
    pos="fixed"
    left="50%"
    transform="translateX(-50%)"
    top="20vh"
    w="600px"
    h="200px"
    {...props}
  />
);

function SimpleModal() {
  const dialog = useDisclosure();
  return (
    <>
      <button onClick={dialog.onOpen}>Open</button>
      <Modal isOpen={dialog.isOpen} onClose={dialog.onClose}>
        <Overlay />
        <Dialog>Welcome Home</Dialog>
      </Modal>
    </>
  );
}

stories.add("simple", () => <SimpleModal />);

function NestedModal() {
  const dialog1 = useDisclosure();
  const dialog2 = useDisclosure();
  const dialog3 = useDisclosure();
  return (
    <>
      <button onClick={dialog1.onOpen}>Open</button>
      <Modal isOpen={dialog1.isOpen} onClose={dialog1.onClose}>
        <Overlay />
        <Dialog>
          Welcome Home
          <br />
          <button>Button 2</button>
          <button onClick={dialog2.onOpen}>Open Nested</button>
          <Modal isOpen={dialog2.isOpen} onClose={dialog2.onClose}>
            <Overlay />
            <Dialog>
              Welcome Home
              <button onClick={dialog3.onOpen}>Open Nested 2</button>
              <Modal isOpen={dialog3.isOpen} onClose={dialog3.onClose}>
                <Overlay />
                <Dialog>Welcome Home</Dialog>
              </Modal>
            </Dialog>
          </Modal>
        </Dialog>
      </Modal>
    </>
  );
}

stories.add("nested", () => <NestedModal />);
