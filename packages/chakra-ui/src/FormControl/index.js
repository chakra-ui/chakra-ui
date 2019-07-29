/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useId } from "@reach/auto-id";
import { createContext, useContext } from "react";
import Text from "../Text";
import { useUIMode } from "../ThemeProvider";
import Box from "../Box";

export const useFormControlProps = props => {
  const context = useFormControlContext();
  if (!context) {
    return props;
  }
  const keys = Object.keys(context);
  return keys.reduce((acc, prop) => {
    acc[prop] = props[prop];

    if (context) {
      /** Giving precedence to `props` over `context` */
      if (props[prop] == null) {
        acc[prop] = context[prop];
      }
    }

    return acc;
  }, {});
};

const Message = props => {
  return (
    <Text lineHeight="none" iconSize="12px" mt={2} fontSize="sm" {...props} />
  );
};

export const ErrorMessage = props => {
  const { mode } = useUIMode();
  const { id } = useFormControlProps(props);
  const color = { light: "red.500", dark: "red.300" };
  return (
    <Message
      leftIcon="warning"
      color={color[mode]}
      {...props}
      id={`${id}-error`}
    />
  );
};

export const ValidMessage = props => {
  const { mode } = useUIMode();
  const { id } = useFormControlProps(props);
  const color = { light: "green.500", dark: "green.200" };
  return (
    <Message
      leftIcon="check-circle"
      color={color[mode]}
      {...props}
      id={`${id}-valid`}
    />
  );
};

export const HelperMessage = props => {
  const { mode } = useUIMode();
  const { id } = useFormControlProps(props);
  const color = { light: "gray.500", dark: "alpha.600" };
  return <Message id={`${id}-helper`} color={color[mode]} {...props} />;
};

export const RequiredIndicator = props => {
  const { mode } = useUIMode();
  const color = { light: "red.500", dark: "red.300" };
  return (
    <Box as="span" ml={1} color={color[mode]} aria-hidden="true" {...props} />
  );
};

export const FormLabel = ({ children, ...props }) => {
  const { mode } = useUIMode();
  const { id, isRequired, isDisabled } = useFormControlProps(props);
  const color = { light: "inherit", dark: "alpha.800" };

  return (
    <Box
      fontSize="md"
      pr="12px"
      pb="4px"
      opacity={isDisabled ? "0.4" : "1"}
      color={color[mode]}
      id={`${id}-label`}
      htmlFor={id}
      fontWeight="medium"
      textAlign="left"
      verticalAlign="middle"
      display="inline-block"
      as="label"
      {...props}
    >
      {children}
      {isRequired && <RequiredIndicator children="*" />}
    </Box>
  );
};

export const ValidationText = ({ children, color, ...props }) => {
  return (
    <Text
      display="flex"
      alignItems="center"
      mt={2}
      leftIcon="warning"
      fontSize="sm"
      color={color}
      {...props}
    >
      {children}
    </Text>
  );
};

const FormControlContext = createContext();

export const useFormControlContext = () => {
  const context = useContext(FormControlContext);
  return context;
};

const FormControl = ({
  id,
  name = "form-control",
  children,
  isInvalid,
  isRequired,
  isDisabled,
  ...rest
}) => {
  const { mode } = useUIMode();
  const fallbackId = `${name}-${useId()}`;

  const childContext = {
    name,
    id: id || fallbackId,
    isRequired,
    isDisabled,
    isInvalid,
    mode
  };

  return (
    <FormControlContext.Provider value={childContext}>
      <Box {...rest}>{children}</Box>
    </FormControlContext.Provider>
  );
};

export default FormControl;
