/** @jsx jsx */
import { jsx } from "@emotion/core";
import { oneOf } from "prop-types";
import CloseButton from "./CloseButton";
import {
  DialogContent as DrawerContent,
  DialogOverlay as DrawerOverlay
} from "./DialogComponents";
import { Transition } from "react-spring/renderprops";
import { useUIMode } from "./ThemeProvider";

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

const Drawer = ({
  isOpen,
  onClose,
  children,
  size = "lg",
  isFullHeight,
  initialFocusRef,
  showCloseButton,
  placement = "right"
}) => {
  const mode = useUIMode();
  return (
    <DrawerTransition {...{ isOpen, placement, isFullHeight }}>
      {({ styles, transform, placements }) => (
        <DrawerOverlay
          initialFocusRef={initialFocusRef}
          onDismiss={onClose}
          css={{ opacity: styles.opacity }}
        >
          <DrawerContent
            mode={mode}
            css={theme => ({
              maxWidth: theme.sizes[size],
              position: "fixed",
              transform: transform(styles.offset),
              ...placements[placement]
            })}
          >
            {children}
            {showCloseButton && (
              <CloseButton
                onClick={onClose}
                position="absolute"
                top="8px"
                right="12px"
              />
            )}
          </DrawerContent>
        </DrawerOverlay>
      )}
    </DrawerTransition>
  );
};

Drawer.propTypes = {
  size: oneOf([
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
    "full"
  ]),
  placement: oneOf(["top", "left", "right", "bottom"])
};

export default Drawer;
