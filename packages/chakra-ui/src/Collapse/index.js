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
      duration,
      easing = "ease-in-out",
      startingHeight = 0,
      endingHeight = "auto",
      ...rest
    },
    ref,
  ) => {
    return (
      <AnimateHeight
        duration={duration}
        easing={easing}
        animateOpacity={animateOpacity}
        height={isOpen ? endingHeight : startingHeight}
        {...{ onAnimationStart, onAnimationEnd }}
      >
        <Box ref={ref} {...rest} />
      </AnimateHeight>
    );
  },
);

export default Collapse;
