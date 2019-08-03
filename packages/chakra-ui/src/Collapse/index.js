/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import AnimateHeight from "react-animate-height";
import Box from "../Box";

const Collapse = forwardRef(
  (
    {
      isOpen,
      animateOpacity,
      onAnimationStart,
      onAnimationEnd,
      duration = 200,
      collapsedHeight = 0,
      ...rest
    },
    ref,
  ) => {
    return (
      <AnimateHeight
        duration={duration}
        animateOpacity={animateOpacity}
        easing="ease-in-out"
        height={isOpen ? "auto" : collapsedHeight}
        {...{ onAnimationStart, onAnimationEnd }}
      >
        <Box ref={ref} {...rest} />
      </AnimateHeight>
    );
  },
);

export default Collapse;
