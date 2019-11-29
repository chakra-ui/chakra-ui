import * as React from "react";
import * as ReactDOM from "react-dom";
import { storiesOf } from "@storybook/react";
import useModal from "./useModal";
import { ThemeProvider } from "@chakra-ui/theme";
import usePortal from "../usePortal";
import { Portal } from "../usePortal/examples";

const stories = storiesOf("useModal", module);
stories.addDecorator(story => <ThemeProvider>{story()}</ThemeProvider>);

function Dialog(props: any) {
  const [DialogManager, dialog] = useModal(props);
  return (
    <Portal className="dialog__portal">
      <DialogManager>
        <div {...dialog}>{props.children}</div>
      </DialogManager>
    </Portal>
  );
}

function SampleModal({ children }: any) {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(s => !s);
  const close = () => setIsOpen(false);
  return (
    <>
      <button onClick={toggle}>Open</button>
      {isOpen && <Dialog onClose={close}>{children}</Dialog>}
    </>
  );
}

stories.add("Default", () => (
  <SampleModal>
    <SampleModal>
      Level 1<SampleModal>Level 2</SampleModal>
    </SampleModal>
  </SampleModal>
));
