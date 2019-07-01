/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import {
  DialogContent as Content,
  DialogOverlay as Overlay
} from "@reach/dialog";
import { Transition } from "react-spring/renderprops";
import { themeGet } from "@styled-system/theme-get";
import { Box, Flex } from "../Layout";

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

const ModalOverlay = styled(Overlay)({
  backgroundColor: "rgba(15, 15, 15, 0.6)",
  bottom: 0,
  left: 0,
  top: 0,
  right: 0,
  overflowY: "auto",
  position: "fixed"
});

const ModalContent = styled(Content)(props => ({
  width: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  boxShadow: themeGet(`shadows.modal.${props.mode}`)(props),
  backgroundColor:
    props.mode === "dark" ? themeGet(`colors.gray.800`)(props) : "#fff",
  color: props.mode === "dark" ? themeGet(`colors.alpha.800`)(props) : "inherit"
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
