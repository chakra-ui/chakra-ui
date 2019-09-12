import React, { cloneElement } from "react";
import { Transition } from "react-transition-group";
import { useForkRef } from "../utils";

const transitionStyles = {
  entering: {
    opacity: 1,
  },
  entered: {
    opacity: 1,
  },
};

const defaultTimeout = {
  enter: 200,
  exit: 50,
};

export const reflow = node => node.scrollTop;

const Fade = React.forwardRef(
  (
    {
      children,
      in: inProp,
      onEnter,
      onExit,
      timeout = defaultTimeout,
      ...rest
    },
    ref,
  ) => {
    const handleRef = useForkRef(children.ref, ref);

    let enterTimeout = typeof timeout === "number" ? timeout : timeout.enter;
    let exitTimeout = typeof timeout === "number" ? timeout : timeout.exit;

    const handleEnter = (node, isAppearing) => {
      reflow(node);

      node.style.webkitTransition = `opacity ${enterTimeout}ms`;
      node.style.transition = `opacity ${enterTimeout}ms`;

      if (onEnter) {
        onEnter(node, isAppearing);
      }
    };

    const handleExit = node => {
      node.style.webkitTransition = `opacity ${exitTimeout}ms`;
      node.style.transition = `opacity ${exitTimeout}ms`;

      if (onExit) {
        onExit(node);
      }
    };

    return (
      <Transition
        appear
        in={inProp}
        onEnter={handleEnter}
        onExit={handleExit}
        timeout={timeout}
        {...rest}
      >
        {(state, childProps) => {
          const visibility =
            state === "exited" && !inProp ? "hidden" : undefined;

          return cloneElement(children, {
            style: {
              opacity: 0,
              visibility,
              ...transitionStyles[state],
              ...children.props.style,
            },
            ref: handleRef,
            ...childProps,
          });
        }}
      </Transition>
    );
  },
);

export default Fade;
