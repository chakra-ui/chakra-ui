import * as React from "react";
import { storiesOf } from "@storybook/react";
import setup from "../story.setup";
import { usePinInputProvider, usePinInput } from "./Pin-Input.hook";

const stories = storiesOf("PinInput", module);
stories.addDecorator(setup);

function Example() {
  const context = usePinInputProvider({ autoFocus: true });
  const input1 = usePinInput({ context });
  const input2 = usePinInput({ context });
  const input3 = usePinInput({ context });
  const input4 = usePinInput({ context });

  return (
    <div>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <input {...input1} />
      <input {...input2} />
      <input {...input3} />
      <input {...input4} />
    </div>
  );
}

stories.add("default", () => <Example />);
