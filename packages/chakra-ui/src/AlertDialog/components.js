/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import {
  AlertDialogContent as ReachAlertDialogContent,
  AlertDialogDescription,
  AlertDialogLabel,
  AlertDialogOverlay as ReachAlertDialogOverlay,
} from "@reach/alert-dialog";
import { forwardRef } from "react";
import Box, { systemProps } from "../Box";
import extraConfig from "../Box/config";
import { useColorMode } from "../ColorModeProvider";

const AlertDialogHeader = props => (
  <Box py={4} px={6} as={AlertDialogLabel} {...props} />
);

const AlertDialogBody = props => (
  <Box px={6} py={2} as={AlertDialogDescription} {...props} />
);

const AlertDialogFooter = props => <Box ml="auto" p={6} {...props} />;

const StyledOverlay = styled(ReachAlertDialogOverlay)(systemProps, extraConfig);

const AlertDialogOverlay = ({
  zIndex = 5,
  bg = "rgba(16,22,26,.7)",
  ...props
}) => (
  <StyledOverlay
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
);

const AlertDialogContent = forwardRef((props, ref) => {
  const { colorMode } = useColorMode();
  const colorModeStyles = {
    light: {
      bg: "white",
      shadow: "0 7px 14px 0 rgba(0,0,0, 0.1), 0 3px 6px 0 rgba(0, 0, 0, .07)",
    },
    dark: {
      bg: "gray.700",
      shadow: `rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px`,
    },
  };
  const styleProps = colorModeStyles[colorMode];

  return (
    <Box
      as={ReachAlertDialogContent}
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

export {
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertDialogContent,
};
