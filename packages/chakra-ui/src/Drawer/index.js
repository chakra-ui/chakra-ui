/** @jsx jsx */
import { jsx } from "@emotion/core";
import { DrawerContent, DrawerOverlay, DrawerTransition } from "./components";

/**
 * Mapping the maxWidth tokens in `theme.sizes` to the size prop.
 */
const drawerSizes = {
  xs: "xs",
  sm: "md",
  md: "lg",
  lg: "2xl",
  xl: "4xl",
  full: "100vw",
};

const Drawer = ({
  isOpen,
  onClose,
  children,
  size = "md",
  isFullHeight,
  initialFocusRef,
  placement = "right",
  overlayBg,
  zIndex,
  ...rest
}) => {
  const maxWidth = size in drawerSizes ? drawerSizes[size] : size;

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
            maxWidth={maxWidth}
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

export default Drawer;
export * from "./components";
