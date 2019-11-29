import { ThemeProvider } from "@chakra-ui/theme";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import usePortal from "./usePortal";

const stories = storiesOf("usePortal", module).addDecorator(story => (
  <ThemeProvider>
    {/* <CSSReset /> */}
    {story()}
  </ThemeProvider>
));

const Portal = (props: any): React.ReactPortal | null => {
  const portal = usePortal(props.className);
  if (!portal) return null;

  const [PortalProvider, mountNode] = portal;

  return ReactDOM.createPortal(
    <PortalProvider>{props.children}</PortalProvider>,
    mountNode,
  );
};

export { Portal };

stories.add("Default", () => (
  <>
    <Portal className="popover__portal">This will be portaled</Portal>
    <Portal className="modal__portal">
      This will be portaled
      <Portal className="modal__portal">This will be portaled</Portal>
    </Portal>
  </>
));
