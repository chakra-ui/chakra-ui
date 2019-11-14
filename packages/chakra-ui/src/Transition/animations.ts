import { keyframes, css } from "@emotion/core";

const animationEasing = {
  deceleration: `cubic-bezier(0.0, 0.0, 0.2, 1)`,
  acceleration: `cubic-bezier(0.4, 0.0, 1, 1)`,
  spring: `cubic-bezier(0.175, 0.885, 0.320, 1.175)`,
};

const animationDuration = 200;

const openAnimation = keyframes`
  from{
    transform:  scale(0.9)
  };

  to {
    transform: scale(1)
  }
`;

const closeAnimation = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  };

  to {
    transform: scale(0.9);
    opacity: 0
  }
`;

export const animationStyles = css`
  &[data-state="entering"],
  &[data-state="entered"] {
    animation: ${openAnimation} ${animationDuration}ms
      cubic-bezier(0.215, 0.61, 0.355, 1) both;
  }

  &[data-state="exiting"],
  &[data-state="exited"] {
    animation: ${closeAnimation} 200ms ${animationEasing.acceleration} both;
  }
`;
