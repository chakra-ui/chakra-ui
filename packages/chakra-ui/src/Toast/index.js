/** @jsx jsx */
import { jsx } from "@emotion/core";
import toaster from "toasted-notes";
import Alert, { AlertIcon, AlertTitle, AlertDescription } from "../Alert";
import ThemeProvider, { useTheme } from "../ThemeProvider";
import ColorModeProvider from "../src/ColorModeProvider";
import Box from "../Box";
import CloseButton from "../CloseButton";

const Toast = ({
  status,
  variant,
  id,
  title,
  isClosable,
  onClose,
  description,
  ...props
}) => {
  return (
    <Alert
      status={status}
      variant={variant}
      id={id}
      textAlign="left"
      boxShadow="lg"
      rounded="md"
      alignItems="start"
      m={2}
      pr={7}
      {...props}
    >
      <AlertIcon />
      <Box flex="1">
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && <AlertDescription>{description}</AlertDescription>}
      </Box>
      {isClosable && (
        <CloseButton
          size="sm"
          onClick={onClose}
          position="absolute"
          right="4px"
          top="4px"
        />
      )}
    </Alert>
  );
};

const ChakraProvider = ({ theme, children }) => {
  return (
    <ColorModeProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeProvider>
  );
};

export function useToast() {
  const theme = useTheme();

  function notify({
    position = "bottom",
    duration = 5000,
    render,
    title,
    description,
    status,
    variant = "solid",
    isClosable,
  }) {
    const options = {
      position,
      duration,
    };

    if (render) {
      return toaster.notify(
        ({ onClose, id }) => (
          <ChakraProvider theme={theme}>
            {render({ onClose, id })}
          </ChakraProvider>
        ),
        options,
      );
    }

    toaster.notify(
      ({ onClose, id }) => (
        <ChakraProvider theme={theme}>
          <Toast
            {...{
              onClose,
              id,
              title,
              description,
              status,
              variant,
              isClosable,
            }}
          />
        </ChakraProvider>
      ),
      options,
    );
  }

  return notify;
}

export default useToast;
