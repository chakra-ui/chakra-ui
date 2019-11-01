import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { useRover, useRoverState } from "./useRover";
import { SelectExample } from "./useSelect";
import { omit } from "@chakra-ui/utils";
import useLogger from "./useLogger";

const stories = storiesOf("Hooks", module).addDecorator(story => (
  <ThemeProvider>
    <CSSReset />
    {story()}
  </ThemeProvider>
));

function Rover(props: any) {
  const rover = useRover(props);
  const allProps = { ...props, ...rover };
  const finalProps = omit(allProps, ["value", "actions", "state"]);

  return <div {...finalProps} />;
}

export function RoverExample() {
  const rover = useRoverState({ loop: true });
  useLogger(rover.state);
  return (
    <div>
      <Rover value="option 1" {...rover}>
        Option 1
      </Rover>
      <Rover value="option 2" {...rover}>
        Option 2
      </Rover>
      <Rover value="option 3" {...rover}>
        Option 3
      </Rover>
    </div>
  );
}

stories.add("Register", () => <RoverExample />);
stories.add("Select", () => <SelectExample />);
