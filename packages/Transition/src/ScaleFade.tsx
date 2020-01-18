import React from "react";
import Transition, { TransitionProps } from "react-transition-group/Transition";
import { TransitionContext } from "./Transition.context";
import { Omit } from "@chakra-ui/utils";

function getTransitionStyles(initialScale: number) {
  return {
    init: {
      opacity: 0,
      transform: `scale(${initialScale})`,
    },
    entered: {
      opacity: 1,
      transform: `scale(1)`,
    },
    exiting: {
      opacity: 0,
      transform: `scale(${initialScale})`,
    },
  };
}

interface ScaleProps extends Omit<TransitionProps, "timeout"> {
  initialScale?: number;
  timeout?: number;
  children:
    | React.ReactNode
    | ((styles: React.CSSProperties) => React.ReactNode);
}

export const ScaleFade = ({
  in: inProp,
  initialScale = 0.9,
  timeout = 300,
  children,
  ...props
}: ScaleProps) => {
  const transitionStyles = getTransitionStyles(initialScale);

  type TransitionState = keyof typeof transitionStyles;

  const rootStyle = {
    transition: `all ${200}ms cubic-bezier(0.45, 0, 0.40, 1)`,
  };

  const computeStyle = (state: TransitionState) => ({
    ...rootStyle,
    ...transitionStyles.init,
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
};

export default ScaleFade;
