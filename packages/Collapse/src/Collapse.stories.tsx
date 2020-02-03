import * as React from "react";
import { storiesOf } from "@storybook/react";
import setup from "../story.setup";
import Collapse from "./Collapse";

const stories = storiesOf("Collapse", module);
stories.addDecorator(setup);

function Example() {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  return (
    <>
      <button onClick={handleToggle}>Toggle</button>
      <Collapse mt={4} isOpen={show}>
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
        labore wes anderson cred nesciunt sapiente ea proident.
      </Collapse>
    </>
  );
}
stories.add("basic", () => <Example />);

stories.add("changing static height", () => {
  function Example() {
    const [show, setShow] = React.useState(false);

    const handleToggle = () => setShow(!show);

    return (
      <>
        <Collapse startingHeight={20} isOpen={show}>
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
          terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
          labore wes anderson cred nesciunt sapiente ea proident.
        </Collapse>
        <button onClick={handleToggle}>{show ? "Collapse" : "Expand"}</button>
      </>
    );
  }

  return <Example />;
});
