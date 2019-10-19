import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Collapse } from ".";

const stories = storiesOf("Collapse", module);

export function CollapseExample() {
  const [show, setShow] = React.useState(false);

  const handleToggle = () => setShow(!show);

  return (
    <div>
      <button onClick={handleToggle}>Toggle</button>
      <Collapse mt={4} isOpen={show}>
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
        labore wes anderson cred nesciunt sapiente ea proident.
      </Collapse>
    </div>
  );
}

stories.add("default", () => <CollapseExample />);
