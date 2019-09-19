/** @jsx jsx */
import { jsx } from "@emotion/core";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import { forwardRef } from "react";
import { Transition } from "react-spring/renderprops.cjs";
import { useTheme } from "../ThemeProvider";
import { useColorMode } from "../ColorModeProvider";
import Box from "../Box";
import Flex from "../Flex";
import styled from "@emotion/styled-base";
import { systemProps } from "../Box";
import extraConfig from "../Box/config";

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

const StyledDialogOverlay = styled(DialogOverlay)(systemProps, extraConfig);

const ModalOverlay = forwardRef(
  ({ bg = "rgba(16,22,26,0.7)", zIndex, ...props }, ref) => (
    <StyledDialogOverlay
      ref={ref}
      position="fixed"
      zIndex={zIndex}
      bottom="0"
      top="0"
      left="0"
      right="0"
      overflowY="auto"
      bg={bg}
      {...props}
    />
  ),
);

export const modalContentStyle = ({ colorMode }) => {
  let style = {
    light: {
      bg: "#fff",
      boxShadow:
        "0 7px 14px 0 rgba(0,0,0, 0.1), 0 3px 6px 0 rgba(0, 0, 0, .07)",
    },
    dark: {
      bg: "gray.700",
      boxShadow: `rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px`,
    },
  };

  return style[colorMode];
};

const ModalContent = forwardRef((props, ref) => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const styleProps = modalContentStyle({ colorMode, theme });
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
