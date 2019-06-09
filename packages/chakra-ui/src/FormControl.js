/** @jsx jsx */
import { jsx } from "@emotion/core";
import { cloneElement } from "react";
import Text from "./Text";
import { Box } from "./Layout";

const Label = ({
  children,
  className,
  isInvalid,
  isOptional,
  optionalText = "(Optional)",
  isReadOnly,
  ...rest
}) => {
  return (
    <Box
      fontSize="md"
      pr="12px"
      pb="4px"
      fontWeight="medium"
      verticalAlign="middle"
      display="inline-block"
      as="label"
      {...rest}
    >
      {children}
      {!isOptional && (
        <Box opacity="50%" as="small" fontSize="84%" ml={1}>
          {optionalText}
        </Box>
      )}
    </Box>
  );
};

const FormControl = ({
  children,
  label,
  isInvalid,
  isRequired,
  helpText,
  htmlFor,
  mode = "light",
  validationText,
  ...rest
}) => {
  const textColor = { light: "inherit", dark: "alpha.800" };
  const validationTextColor = {
    light: isInvalid ? "red.500" : "green.500",
    dark: isInvalid ? "red.300" : "green.200"
  };
  return (
    <Box {...rest}>
      {label && (
        <Label
          isOptional={isRequired}
          htmlFor={htmlFor}
          color={textColor[mode]}
        >
          {label}
        </Label>
      )}

      {helpText && (
        <Text
          as="span"
          fontSize="xs"
          color={textColor[mode]}
          opacity="75%"
          pb="4px"
          pt="8px"
          css={{ float: "right" }}
        >
          {helpText}
        </Text>
      )}

      <Box style={{ clear: "right" }}>
        {cloneElement(children, {
          id: htmlFor,
          isInvalid,
          isRequired,
          mode
        })}
      </Box>

      {validationText && (
        <Text mt={2} fontSize="xs" as="small" color={validationTextColor[mode]}>
          {validationText}
        </Text>
      )}
    </Box>
  );
};

export default FormControl;
