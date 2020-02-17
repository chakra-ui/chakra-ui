import * as React from "react";
import useTooltip from "./Tooltip.hook";

export default {
  title: "Tooltip",
};

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

export const Example = () => (
  <>
    <Tooltip>This is tip 1</Tooltip>
    <Tooltip>This is tip 2</Tooltip>
  </>
);
