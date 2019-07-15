/** @jsx jsx */
import { jsx } from "@emotion/core";
import toaster from "toasted-notes";
import Alert from "./Alert";
import ThemeProvider, { useTheme, UIModeProvider } from "./ThemeProvider";

export function useToast() {
  const theme = useTheme();

  function notify({
    position,
    duration,
    render,
    title,
    subtitle,
    status,
    variant,
    showIcon
  }) {
    const options = {
      position,
      duration
    };

    if (render) {
      return toaster.notify(
        ({ onClose, id }) => (
          <ThemeProvider theme={theme}>{render({ onClose, id })}</ThemeProvider>
        ),
        options
      );
    }

    toaster.notify(
      ({ onClose, id }) => (
        <ThemeProvider theme={theme}>
          <UIModeProvider>
            <Alert
              isClosable
              onClose={onClose}
              id={String(id)}
              title={title}
              status={status}
              width="100%"
              variant={variant}
              showIcon={showIcon}
              textAlign="left"
              m={2}
            >
              {subtitle}
            </Alert>
          </UIModeProvider>
        </ThemeProvider>
      ),
      options
    );
  }

  return notify;
}

export default useToast;
