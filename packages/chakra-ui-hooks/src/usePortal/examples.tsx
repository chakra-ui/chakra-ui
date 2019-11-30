import { ThemeProvider } from "@chakra-ui/theme";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import Portal from "./usePortal";

const stories = storiesOf("usePortal", module).addDecorator(story => (
  <ThemeProvider>
    {/* <CSSReset /> */}
    {story()}
  </ThemeProvider>
));

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
