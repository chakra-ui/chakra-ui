/** @jsx jsx */
import { jsx } from "@emotion/core";
import { cloneElement } from "react";
import Text from "./Text";
import { Box } from "./Layout";
import VisuallyHidden from "./VisuallyHidden";

export const Label = ({
  children,
  isOptional,
  optionalText = "(Optional)",
  ...rest
}) => {
  return (
    <Box
      fontSize="md"
      pr="12px"
      pb="4px"
      fontWeight="medium"
      textAlign="left"
      verticalAlign="middle"
      display="inline-block"
      as="label"
      {...rest}
    >
      {children}
      {isOptional && (
        <Box opacity="50%" fontSize="84%" ml={1}>
          {optionalText}
        </Box>
      )}
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
    >
      {children}
    </Text>
  );
};

const FormControl = props => {
  const {
    children,
    label,
    isInvalid,
    isOptional,
    isRequired,
    hideLabel,
    helpText,
    id,
    mode = "light",
    validationText,
    ...rest
  } = props;

  const textColor = { light: "inherit", dark: "alpha.800" };
  const validationTextColor = {
    light: isInvalid ? "red.500" : "inherit",
    dark: isInvalid ? "red.400" : "alpha.700"
  };

  const _label =
    typeof label === "string" ? (
      <Label color={textColor[mode]} isOptional={isOptional} htmlFor={id}>
        {label}
      </Label>
    ) : (
      label
    );

  return (
    <Box {...rest}>
      {hideLabel ? <VisuallyHidden>{_label}</VisuallyHidden> : _label}

      {helpText && (
        <Text
          as="span"
          fontSize="sm"
          color={textColor[mode]}
          opacity="75%"
          py="4px"
          css={{ float: "right" }}
        >
          {helpText}
        </Text>
      )}

      <Box style={{ clear: "right" }}>
        {cloneElement(children, {
          id,
          isInvalid,
          isRequired,
          mode
        })}
      </Box>

      {validationText && (
        <Text
          display="flex"
          lineHeight="none"
          mt={2}
          leftIcon="warning"
          fontSize="sm"
          color={validationTextColor[mode]}
        >
          {validationText}
        </Text>
      )}
    </Box>
  );
};

export default FormControl;
