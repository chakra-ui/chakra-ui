/** @jsx jsx */
import { jsx } from "@emotion/core";
import { cloneElement } from "react";
import styled from "@emotion/styled";
import { Text } from "./Text";
import { Box } from "./Layout";
import { Badge } from "./Badge";

const Label = ({
  children,
  className,
  isInvalid,
  isRequired,
  isReadOnly,
  ...rest
}) => {
  return (
    <Text
      fontSize="md"
      p="8px 12px 4px 0"
      fontWeight="semibold"
      verticalAlign="middle"
      display="inline-block"
      as="label"
      {...rest}
    >
      {children}
      {!isRequired && (
        <Badge color="gray" ml={2}>
          Optional
        </Badge>
      )}
    </Text>
  );
};

const StyledFormControl = styled(Box)`
  &.form-control--selected {
    padding: 12px;
    padding-top: 4px;
    background-color: #e5f5f8;
    margin-left: -12px;
    margin-right: -12px;
    transition: background-color 0.25s;
  }

  .form-control__help {
    float: right;
  }
`;

/* To Do:
  IN dark mode, change the red hue for error Text 
*/

const FormControl = ({
  children,
  "aria-label": ariaLabel,
  label,
  className,
  isInvalid,
  isSelected,
  isRequired,
  helpText,
  htmlFor,
  validationText,
  errorId,
  ...rest
}) => {
  return (
    <StyledFormControl {...rest}>
      {label && (
        <Label isRequired={isRequired} htmlFor={htmlFor}>
          {label}
        </Label>
      )}

      {helpText && (
        <Text
          as="span"
          fontSize="xs"
          color="gray.600"
          pb="4px"
          pt="8px"
          aria-labelledby={htmlFor}
        >
          {helpText}
        </Text>
      )}

      <Box style={{ clear: "right" }}>
        {cloneElement(children, {
          id: htmlFor,
          isInvalid,
          isRequired,
          "aria-labelledby": `${htmlFor}_message`
        })}
      </Box>

      {validationText && (
        <Text
          mt={2}
          fontSize="xs"
          as="small"
          id={`${htmlFor}_message`}
          color={isInvalid ? "red.500" : "green.500"}
        >
          {validationText}
        </Text>
      )}
    </StyledFormControl>
  );
};

export default FormControl;
