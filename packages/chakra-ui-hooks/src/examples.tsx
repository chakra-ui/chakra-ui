import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { Rover, useRover } from "./useRover";
import { SelectExample } from "./useSelect";
import { omit } from "@chakra-ui/utils";

const stories = storiesOf("Hooks", module).addDecorator(story => (
  <ThemeProvider>
    <CSSReset />
    {story()}
  </ThemeProvider>
));

function Item(props: any) {
  const rover = useRover(props);
  const _props = omit(props, ["value"]);
  const finalProps = { ..._props, ...rover };

  return <div {...finalProps} />;
}

export function RegisterExample() {
  return (
    <Rover>
      <div>
        <Item value="option 1">Option 1</Item>
        <Item value="option 2">Option 2</Item>
        <Item value="option 3">Option 3</Item>
      </div>
    </Rover>
  );
}

stories.add("Register", () => <RegisterExample />);
stories.add("Select", () => <SelectExample />);
