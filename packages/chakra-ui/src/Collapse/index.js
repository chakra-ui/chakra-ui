/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import AnimateHeight from "react-animate-height";
import Box from "../Box";

const Collapse = forwardRef(
  (
    {
      isOpen,
      animateOpacity = true,
      onAnimationStart,
      onAnimationEnd,
      duration,
      easing = "ease",
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
        applyInlineTransitions={false}
        css={{
          transition:
            "height .2s ease,opacity .2s ease-in-out,transform .2s ease-in-out",
          "&.rah-animating--to-height-zero": {
            opacity: 0,
            transform: "translateY(-0.625rem)",
          },
        }}
        {...{ onAnimationStart, onAnimationEnd }}
      >
        <Box ref={ref} {...rest} />
      </AnimateHeight>
    );
  },
);

Collapse.displayName = "Collapse";

export default Collapse;
