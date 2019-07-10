/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import { Transition } from "react-spring/renderprops";
import { Box, Flex } from "../Layout";
import { generateDarkElevation } from "../theme/colors_utils";

const ModalHeader = ({ children, onClose, ...rest }) => {
  return (
    <Box
      px="20px"
      pt="20px"
      pb="14px"
      as="header"
      position="relative"
      fontSize="xl"
      fontWeight="semibold"
      {...rest}
    >
      {children}
    </Box>
  );
};

const ModalFooter = ({ children, ...rest }) => {
  return (
    <Flex
      px="20px"
      pt="14px"
      pb="20px"
      as="footer"
      justifyContent="flex-end"
      {...rest}
    >
      {children}
    </Flex>
  );
};

const ModalBody = props => {
  return <Box px="20px" flex="1" {...props} />;
};

const ModalOverlay = styled(DialogOverlay)({
  backgroundColor: "rgba(15, 15, 15, 0.6)",
  bottom: 0,
  left: 0,
  top: 0,
  right: 0,
  overflowY: "auto",
  position: "fixed",
  zIndex: 1
});

export const modalStyle = theme => {
  return {
    light: {
      backgroundColor: "#fff",
      color: "inherit",
      boxShadow: theme.shadows.modal.light
    },
    dark: generateDarkElevation()[800]
  };
};

const ModalContent = styled(DialogContent)(({ theme, mode }) => ({
  width: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  ...modalStyle(theme)[mode]
}));

const ModalTransition = ({ isOpen, duration = 150, children }) => {
  return (
    <Transition
      items={isOpen}
      from={{ opacity: 0, y: 10 }}
      enter={{ opacity: 1, y: 0 }}
      leave={{ opacity: 0, y: -10 }}
      config={{ duration }}
    >
      {isOpen => isOpen && (styles => children(styles))}
    </Transition>
  );
};

export {
  ModalHeader,
  ModalTransition,
  ModalFooter,
  ModalBody,
  ModalOverlay,
  ModalContent
};
