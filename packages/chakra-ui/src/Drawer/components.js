/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Transition } from "react-spring/renderprops.cjs";
import {
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalOverlay,
  ModalContent,
} from "../Modal";
import CloseButton from "../CloseButton";
import { useColorMode } from "../ColorModeProvider";
import { forwardRef } from "react";

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
            reactSpringStyles: styles,
            transformStyle: transform(styles.offset),
            placementStyle: placements[placement],
          }))
      }
    </Transition>
  );
};

const DrawerOverlay = ({ showOverlay, ...props }) => (
  <ModalOverlay
    {...(showOverlay === false && { bg: "transparent" })}
    {...props}
  />
);

const DrawerCloseButton = forwardRef(({ onClick, ...rest }, ref) => {
  const { colorMode } = useColorMode();
  const hoverColor = { light: "blackAlpha.100", dark: "whiteAlpha.100" };
  const activeColor = { light: "blackAlpha.200", dark: "whiteAlpha.200" };

  return (
    <CloseButton
      ref={ref}
      onClick={onClick}
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
  DrawerTransition,
  DrawerCloseButton,
  ModalHeader as DrawerHeader,
  ModalFooter as DrawerFooter,
  ModalBody as DrawerBody,
  DrawerOverlay,
  ModalContent as DrawerContent,
};
