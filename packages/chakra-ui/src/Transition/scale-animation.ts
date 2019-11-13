import { keyframes, css } from "@emotion/core";

const animationEasing = {
  deceleration: `cubic-bezier(0.0, 0.0, 0.2, 1)`,
  acceleration: `cubic-bezier(0.4, 0.0, 1, 1)`,
};

const ANIMATION_DURATION = 200;

const openAnimation = keyframes`
  from{
    transform:  scale(0.8);
    opacity: 0;
  };

  to {
    transform: scale(1);
    opacity: 1
  }
`;

const closeAnimation = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  };

  to {
    transform: scale(0.8);
    opacity: 0
  }
`;

export const scaleAnimation = css`
  &[data-state="entering"],
  &[data-state="entered"] {
    animation: ${openAnimation} ${ANIMATION_DURATION}ms
      ${animationEasing.deceleration} both;
  }

  &[data-state="exiting"] {
    animation: ${closeAnimation} 120ms ${animationEasing.acceleration} both;
  }
`;

export default scaleAnimation;
