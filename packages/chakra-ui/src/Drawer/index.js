/** @jsx jsx */
import { jsx } from "@emotion/core";
import { oneOf } from "prop-types";
import { DrawerContent, DrawerOverlay, DrawerTransition } from "./components";

const Drawer = ({
  isOpen,
  onClose,
  children,
  size = "lg",
  isFullHeight,
  initialFocusRef,
  placement = "right",
  overlayBg,
  zIndex,
  ...rest
}) => {
  return (
    <DrawerTransition {...{ isOpen, placement, isFullHeight }}>
      {({ reactSpringStyles, transformStyle, placementStyle }) => (
        <DrawerOverlay
          initialFocusRef={initialFocusRef}
          onDismiss={onClose}
          bg={overlayBg}
          zIndex={zIndex}
          opacity={reactSpringStyles.opacity}
        >
          <DrawerContent
            position="fixed"
            transform={transformStyle}
            maxWidth={size}
            {...placementStyle}
            {...rest}
          >
            {children}
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
    "full",
  ]),
  placement: oneOf(["top", "left", "right", "bottom"]),
};

export default Drawer;
export * from "./components";
