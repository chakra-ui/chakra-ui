/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Transition } from "react-spring/renderprops";

const DrawerTransition = ({
  isOpen,
  children,
  duration = 200,
  placement,
  isFullHeight
}) => {
  let placements = {
    bottom: {
      maxWidth: "100%",
      height: isFullHeight ? "100vh" : "auto",
      bottom: 0,
      left: 0,
      right: 0
    },
    top: {
      maxWidth: "100%",
      height: isFullHeight ? "100vh" : "auto",
      top: 0,
      left: 0,
      right: 0
    },
    left: {
      height: "100vh",
      left: 0,
      top: 0
    },
    right: {
      right: 0,
      top: 0,
      height: "100vh"
    }
  };

  let transitionOptions = {
    bottom: {
      offset: "100%",
      transform: y => `translateY(${y})`
    },
    top: {
      offset: "-100%",
      transform: y => `translateY(${y})`
    },
    left: {
      offset: "-100%",
      transform: x => `translateX(${x})`
    },
    right: {
      offset: "100%",
      transform: x => `translateX(${x})`
    }
  };

  const { transform, offset } = transitionOptions[placement];
  return (
    <Transition
      items={isOpen}
      from={{ opacity: 0, offset }}
      enter={{ opacity: 1, offset: "0%" }}
      leave={{ opacity: 0, offset }}
      config={{ duration }}
    >
      {isOpen =>
        isOpen && (styles => children({ styles, transform, placements }))
      }
    </Transition>
  );
};

export default DrawerTransition;
