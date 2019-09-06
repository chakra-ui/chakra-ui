/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Children, cloneElement } from "react";
import PseudoBox from "../PseudoBox";

const AspectRatioBox = ({ ratio = 4 / 3, children, ...props }) => {
  const child = Children.only(children);
  return (
    <PseudoBox
      pos="relative"
      _before={{
        h: 0,
        content: `""`,
        d: "block",
        pb: `${(1 / ratio) * 100}%`,
      }}
      {...props}
    >
      {cloneElement(child, {
        pos: "absolute",
        w: "full",
        h: "full",
        top: 0,
        left: 0,
      })}
    </PseudoBox>
  );
};

export default AspectRatioBox;
