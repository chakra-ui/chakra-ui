import * as React from "react";
import Transition, { TransitionProps } from "react-transition-group/Transition";
import { TransitionContext } from "./Transition.context";

interface FadeProps extends Omit<TransitionProps, "timeout"> {
  timeout?: number;
  children:
    | React.ReactNode
    | ((styles: React.CSSProperties) => React.ReactNode);
}

const transitionStyles = {
  init: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
};

type TransitionState = keyof typeof transitionStyles;

export function Fade({
  children,
  in: inProp,
  timeout = 250,
  ...props
}: FadeProps) {
  const computeStyle = (state: TransitionState) => ({
    ...transitionStyles.init,
    transition: `all ${timeout}ms cubic-bezier(0.175, 0.885, 0.320, 1.175)`,
    ...transitionStyles[state],
  });

  return (
    <Transition
      appear
      in={inProp}
      timeout={{ enter: 50, exit: timeout }}
      unmountOnExit
      {...props}
    >
      {(state: TransitionState) => (
        <TransitionContext.Provider value={computeStyle(state)}>
          {typeof children === "function"
            ? children(computeStyle(state))
            : children}
        </TransitionContext.Provider>
      )}
    </Transition>
  );
}

export default Fade;
