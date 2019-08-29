/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Button from "../Button";
import Collapse from "../Collapse";
import Box from "../Box";
import React from "react";

const stories = storiesOf("Collapse", module).addDecorator(story => (
  <Box maxW="sm" mx="auto" mt={5}>
    {story()}
  </Box>
));

function Example() {
  const [show, setShow] = React.useState(false);

  const handleToggle = () => setShow(!show);

  return (
    <>
      <Button variantColor="blue" onClick={handleToggle}>
        Toggle
      </Button>
      <Collapse mt={4} isOpen={show}>
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
        labore wes anderson cred nesciunt sapiente ea proident.
      </Collapse>
    </>
  );
}
stories.add("Default", () => <Example />);

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
        <Button size="sm" onClick={handleToggle} mt="1rem">
          {show ? "Collapse" : "Expand"}
        </Button>
      </>
    );
  }

  return <Example />;
});
