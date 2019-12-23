import * as React from "react";
import { storiesOf } from "@storybook/react";
import useModal from "./useModal";
import { ThemeProvider } from "@chakra-ui/theme";
import Portal from "../usePortal/";
import Manager from "./utils/ModalManager";
import useDisclosure from "../useDisclosure";
import FocusLock from "react-focus-lock";
import { createChakra } from "@chakra-ui/system";

const stories = storiesOf("useModal", module);
stories.addDecorator(story => <ThemeProvider>{story()}</ThemeProvider>);

const ModalDialog = createChakra("div", { hook: useModal });

function Dialog(props: React.ComponentProps<typeof ModalDialog>) {
  return (
    <Portal className="dialog__portal">
      <FocusLock>
        <ModalDialog {...props} />
      </FocusLock>
    </Portal>
  );
}

function SampleModal({ children }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button onClick={onOpen}>Open</button>
      {isOpen && <Dialog onClose={onClose}>{children}</Dialog>}
    </>
  );
}

stories.add("Default", () => (
  <Manager>
    <SampleModal>
      This is Modal 1
      <SampleModal>
        This is Modal 2 <br />
        <SampleModal>This is Modal 3</SampleModal>
      </SampleModal>
    </SampleModal>
  </Manager>
));
