/** @jsx jsx */
import { jsx } from "@emotion/core";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import { forwardRef } from "react";
import { Transition } from "react-spring/renderprops";
import { useTheme } from "../ThemeProvider";
import { useColorMode } from "../ColorModeProvider";
import Box from "../Box";
import Flex from "../Flex";
import Fixed from "../Fixed";

const ModalHeader = props => (
  <Box
    px={6}
    py={4}
    as="header"
    position="relative"
    fontSize="xl"
    fontWeight="semibold"
    {...props}
  />
);

const ModalFooter = props => (
  <Flex px={6} py={4} as="footer" justifyContent="flex-end" {...props} />
);

const ModalBody = props => <Box px={6} py={2} flex="1" {...props} />;

const ModalOverlay = forwardRef((props, ref) => (
  <Fixed
    as={DialogOverlay}
    zIndex="1"
    bottom="0"
    top="0"
    left="0"
    right="0"
    overflowY="auto"
    bg="rgba(16,22,26,.7)"
    ref={ref}
    {...props}
  />
));

export const modalContentStyle = ({ mode }) => {
  let style = {
    light: {
      bg: "#fff",
      color: "inherit",
      boxShadow:
        "0 7px 14px 0 rgba(0,0,0, 0.1), 0 3px 6px 0 rgba(0, 0, 0, .07)",
    },
    dark: {
      bg: "gray.700",
      boxShadow: `rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px`,
    },
  };

  return style[mode];
};

const ModalContent = forwardRef((props, ref) => {
  const { mode } = useColorMode();
  const theme = useTheme();
  const styleProps = modalContentStyle({ mode, theme });
  return (
    <Box
      as={DialogContent}
      width="100%"
      position="relative"
      display="flex"
      flexDirection="column"
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

const ModalTransition = ({ isOpen, duration = 150, children }) => (
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

export {
  ModalHeader,
  ModalTransition,
  ModalFooter,
  ModalBody,
  ModalOverlay,
  ModalContent,
};
