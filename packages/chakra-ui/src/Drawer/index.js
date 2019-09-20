/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Transition } from "react-spring/renderprops.cjs";
import { createContext, useContext, forwardRef } from "react";
import { useId } from "@reach/auto-id";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "../Modal";
import CloseButton from "../CloseButton";
import { useColorMode } from "../ColorModeProvider";

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

const DrawerTransition = ({
  isOpen,
  children,
  duration = 200,
  placement,
  isFullHeight,
}) => {
  let placements = {
    bottom: {
      maxWidth: "100%",
      height: isFullHeight ? "100vh" : "auto",
      bottom: 0,
      left: 0,
      right: 0,
    },
    top: {
      maxWidth: "100%",
      height: isFullHeight ? "100vh" : "auto",
      top: 0,
      left: 0,
      right: 0,
    },
    left: {
      height: "100vh",
      left: 0,
      top: 0,
    },
    right: {
      right: 0,
      top: 0,
      height: "100vh",
    },
  };

  let transitionOptions = {
    bottom: {
      offset: "100%",
      transform: y => `translateY(${y})`,
    },
    top: {
      offset: "-100%",
      transform: y => `translateY(${y})`,
    },
    left: {
      offset: "-100%",
      transform: x => `translateX(${x})`,
    },
    right: {
      offset: "100%",
      transform: x => `translateX(${x})`,
    },
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
        isOpen &&
        (styles =>
          children({
            styles: {
              opacity: styles.opacity,
              transform: transform(styles.offset),
            },
            placementStyles: placements[placement],
          }))
      }
    </Transition>
  );
};

const DrawerContext = createContext({});
const useDrawerContext = () => useContext(DrawerContext);

const Drawer = ({
  isOpen,
  onClose,
  isFullHeight,
  size = "md",
  placement = "right",
  ...props
}) => {
  const uuid = useId();
  const headerId = `drawer-${uuid}-header`;
  const bodyId = `drawer-${uuid}-body`;

  return (
    <DrawerTransition {...{ isOpen, placement, isFullHeight }}>
      {({ styles, placementStyles }) => (
        <DrawerContext.Provider
          value={{
            id: uuid,
            headerId,
            bodyId,
            styles,
            placementStyles,
            size,
            onClose,
          }}
        >
          <Modal isOpen={true} onClose={onClose} {...props} />
        </DrawerContext.Provider>
      )}
    </DrawerTransition>
  );
};

const DrawerContent = forwardRef((props, ref) => {
  const { bodyId, styles, placementStyles, size } = useDrawerContext();
  const maxWidth = size in drawerSizes ? drawerSizes[size] : size;

  return (
    <ModalContent
      ref={ref}
      noStyles
      aria-labelledby={bodyId}
      transform={styles.transform}
      maxWidth={maxWidth}
      pos="fixed"
      {...placementStyles}
      {...props}
    />
  );
});

const DrawerOverlay = forwardRef((props, ref) => {
  const { styles } = useDrawerContext();
  return <ModalOverlay ref={ref} opacity={styles.opacity} {...props} />;
});

const DrawerHeader = forwardRef((props, ref) => {
  const { headerId } = useDrawerContext();
  return <ModalHeader ref={ref} id={headerId} {...props} />;
});

const DrawerBody = forwardRef((props, ref) => {
  const { bodyId } = useDrawerContext();
  return <ModalBody ref={ref} id={bodyId} {...props} />;
});

const DrawerCloseButton = forwardRef(({ onClick, ...rest }, ref) => {
  const { colorMode } = useColorMode();
  const { onClose } = useDrawerContext();
  const hoverColor = { light: "blackAlpha.100", dark: "whiteAlpha.100" };
  const activeColor = { light: "blackAlpha.200", dark: "whiteAlpha.200" };

  return (
    <CloseButton
      ref={ref}
      onClick={onClose}
      position="fixed"
      zIndex="1"
      top="8px"
      right="12px"
      _hover={{ bg: hoverColor[colorMode] }}
      _active={{ bg: activeColor[colorMode] }}
      {...rest}
    />
  );
});

export {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  ModalFooter as DrawerFooter,
  DrawerCloseButton,
};
