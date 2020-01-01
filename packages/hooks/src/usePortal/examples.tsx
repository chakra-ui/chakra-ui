import { storiesOf } from "@storybook/react";
import * as React from "react";
import Portal from "./usePortal";
import setup from "../story.setup";

const stories = storiesOf("usePortal", module).addDecorator(setup);

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
