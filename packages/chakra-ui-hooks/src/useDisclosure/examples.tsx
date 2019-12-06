import React from "react";
import { storiesOf } from "@storybook/react";
import useDisclosure from "./useDisclosure";

const stories = storiesOf("useDisclosure", module);

function Test() {
  const disclosure = useDisclosure({ defaultIsOpen: true });
  return (
    <>
      <button onClick={disclosure.onToggle}>Click</button>
      <p>{String(disclosure.isOpen)}</p>
    </>
  );
}

stories.add("useDisclosure Test", () => <Test />);
