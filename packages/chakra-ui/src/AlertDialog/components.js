/** @jsx jsx */
import { jsx } from "@emotion/core";
import { AlertDialogContent as IAlertDialogContent, AlertDialogDescription, AlertDialogLabel, AlertDialogOverlay as IAlertDialogOverlay } from "@reach/alert-dialog";
import css from "@styled-system/css";
import { forwardRef } from "react";
import Box from "../Box";
import Heading from "../Heading";
import { modalContentStyle } from "../Modal";
import { useUIMode } from "../ThemeProvider";

const AlertDialogHeader = props => <Heading as={AlertDialogLabel} {...props} />;
const AlertDialogBody = props => <Box as={AlertDialogDescription} {...props} />;

const AlertDialogOverlay = props => (
  <IAlertDialogOverlay
    css={css({
      zIndex: "1",
      overflowY: "auto",
      bg: "rgba(16,22,26,.7)"
    })}
    {...props}
  />
);

const AlertDialogContent = forwardRef((props, ref) => {
  const { mode } = useUIMode();
  const styleProps = modalContentStyle({ mode });
  return (
    <Box
      as={IAlertDialogContent}
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

export { AlertDialogHeader, AlertDialogBody, AlertDialogOverlay, AlertDialogContent };

