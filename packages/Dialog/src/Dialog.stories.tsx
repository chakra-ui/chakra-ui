import { useDisclosure } from "@chakra-ui/hooks";
import * as React from "react";
import { Dialog, DialogContent, DialogOverlay, getBaseStyle } from "./Dialog";

export default {
  title: "Dialog",
};

const Overlay = (props: any) => (
  <DialogOverlay
    pos="fixed"
    bg="rgba(0,0,0,0.4)"
    left="0"
    top="0"
    w="100vw"
    h="100vh"
    {...props}
  />
);

const DialogContentt = (props: any) => {
  const baseStyle = getBaseStyle({ colorMode: "dark", isCentered: true });
  return (
    <DialogContent maxW="600px" height="200px" {...baseStyle} {...props} />
  );
};

export function SimpleModal() {
  const dialog = useDisclosure();
  return (
    <>
      <button onClick={dialog.onOpen}>Open</button>
      <Dialog isOpen={dialog.isOpen} onClose={dialog.onClose}>
        <Overlay />
        <DialogContentt>Welcome Home</DialogContentt>
      </Dialog>
    </>
  );
}

export function NestedModal() {
  const dialog1 = useDisclosure();
  const dialog2 = useDisclosure();
  const dialog3 = useDisclosure();
  return (
    <>
      <button onClick={dialog1.onOpen}>Open</button>
      <Dialog isOpen={dialog1.isOpen} onClose={dialog1.onClose}>
        <Overlay />
        <DialogContentt>
          Welcome Home
          <br />
          <button>Button 2</button>
          <button onClick={dialog2.onOpen}>Open Nested</button>
          <Dialog isOpen={dialog2.isOpen} onClose={dialog2.onClose}>
            <Overlay />
            <DialogContentt>
              Welcome Home
              <button onClick={dialog3.onOpen}>Open Nested 2</button>
              <Dialog isOpen={dialog3.isOpen} onClose={dialog3.onClose}>
                <Overlay />
                <DialogContentt>Welcome Home</DialogContentt>
              </Dialog>
            </DialogContentt>
          </Dialog>
        </DialogContentt>
      </Dialog>
    </>
  );
}
