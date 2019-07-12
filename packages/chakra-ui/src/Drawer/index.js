/** @jsx jsx */
import { jsx } from "@emotion/core";
import { oneOf } from "prop-types";
import CloseButton from "../CloseButton";
import { useUIMode } from "../theme";
import { DrawerTransition, DrawerOverlay, DrawerContent } from "./components";

const Drawer = ({
  isOpen,
  onClose,
  children,
  size = "lg",
  isFullHeight,
  initialFocusRef,
  showCloseButton,
  hideOverlay,
  placement = "right"
}) => {
  const { mode } = useUIMode();
  return (
    <DrawerTransition {...{ isOpen, placement, isFullHeight }}>
      {({ styles, transform, placements }) => (
        <DrawerOverlay
          initialFocusRef={initialFocusRef}
          onDismiss={onClose}
          hideOverlay={hideOverlay}
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
export * from "./components";
