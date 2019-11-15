import { storiesOf } from "@storybook/react";
import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/theme";
import useDisclosure from "./useDisclosure";
import { useRef } from "@storybook/addons";

const stories = storiesOf("Hooks", module);

stories.addDecorator(story => (
  <ThemeProvider>
    <CSSReset />
    {story()}
  </ThemeProvider>
));

function Test() {
  const disclosure = useDisclosure({ defaultIsOpen: true });
  return (
    <>
      <button onClick={disclosure.onToggle}>Click</button>
      <p>{String(disclosure.isOpen)}</p>
    </>
  );
}

stories.add("Hook test", () => <Test />);
