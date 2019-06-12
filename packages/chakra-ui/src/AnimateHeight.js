import React from "react";
import Animate from "react-animate-height";

const AnimateHeight = ({
  isOpen,
  children,
  animateOpacity,
  duration = 300,
  delay,
  onAnimationStart,
  onAnimationEnd
}) => {
  return (
    <Animate
      duration={duration}
      animateOpacity={animateOpacity}
      height={isOpen ? "auto" : 0}
      style={{
        transition: `height ${duration}ms ease,opacity ${duration}ms ease-in-out,transform ${duration}ms ease-in-out`,
        ...(!isOpen && {
          transform: "translateY(-0.625rem)"
        })
      }}
      {...{ delay, onAnimationStart, onAnimationEnd }}
    >
      {children}
    </Animate>
  );
};

export default AnimateHeight;
