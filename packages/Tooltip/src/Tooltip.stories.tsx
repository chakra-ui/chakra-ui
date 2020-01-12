import * as React from "react";
import { storiesOf } from "@storybook/react";
import setup from "../story.setup";
import useTooltip from "./Tooltip.hook";

const stories = storiesOf("Tooltip", module);
stories.addDecorator(setup);

export const Tooltip = ({ children }: any) => {
  const tip = useTooltip({ hideOnClick: true });
  return (
    <>
      <button {...tip.bind}>Hover me</button>
      {tip.isOpen && (
        <div style={{ position: "absolute", bottom: 20 }}>{children}</div>
      )}
    </>
  );
};

stories.add("default", () => (
  <>
    <Tooltip>This is tip 1</Tooltip>
    <Tooltip>This is tip 2</Tooltip>
  </>
));
