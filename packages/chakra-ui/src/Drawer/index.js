/** @jsx jsx */
import { jsx } from "@emotion/core";
import { createContext, useContext, forwardRef } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
} from "../Modal";
import { Slide } from "../Transition";

const DrawerContext = createContext({});
const useDrawerContext = () => useContext(DrawerContext);

const Drawer = ({
  isOpen,
  onClose,
  isFullHeight,
  placement = "right",
  finalFocusRef,
  size = "xs",
  ...props
}) => {
  return (
    <Slide
      in={isOpen}
      from={placement}
      finalHeight={isFullHeight ? "100vh" : "auto"}
    >
      {styles => (
        <DrawerContext.Provider value={{ styles, size }}>
          <Modal
            isOpen={true}
            onClose={onClose}
            finalFocusRef={finalFocusRef}
            formatIds={id => ({
              content: `drawer-${id}`,
              header: `drawer-${id}-header`,
              body: `drawer-${id}-body`,
            })}
            {...props}
          />
        </DrawerContext.Provider>
      )}
    </Slide>
  );
};

const drawerSizes = {
  xs: "xs",
  sm: "md",
  md: "lg",
  lg: "2xl",
  xl: "4xl",
  full: "100vw",
};

const DrawerContent = forwardRef((props, ref) => {
  const {
    // Don't want to  animate the opacity of the DrawerContent
    styles: { opacity, ...placementStyles },
    size,
  } = useDrawerContext();

  const _size = size in drawerSizes ? drawerSizes[size] : size;

  return (
    <ModalContent
      ref={ref}
      noStyles
      pos="fixed"
      maxWidth={_size}
      {...placementStyles}
      {...props}
    />
  );
});

DrawerContent.displayName = "DrawerContent";

const DrawerOverlay = forwardRef((props, ref) => {
  const { styles } = useDrawerContext();
  return <ModalOverlay ref={ref} opacity={styles.opacity} {...props} />;
});

DrawerOverlay.displayName = "DrawerOverlay";

const DrawerCloseButton = forwardRef(({ onClick, ...rest }, ref) => (
  <ModalCloseButton ref={ref} position="fixed" zIndex="1" {...rest} />
));

DrawerCloseButton.displayName = "DrawerCloseButton";

export {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  ModalBody as DrawerBody,
  ModalHeader as DrawerHeader,
  ModalFooter as DrawerFooter,
  DrawerCloseButton,
};
