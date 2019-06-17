/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Children, cloneElement, forwardRef } from "react";
import styled from "@emotion/styled";
import { oneOf } from "prop-types";
import { Box, Absolute, Flex } from "../Layout";
import { themeGet } from "@styled-system/theme-get";
import Icon from "./Icon";
import List from "./List";
import { FormLabel } from "./FormControl";
import VisuallyHidden from "./VisuallyHidden";
import { genId } from "./utils";

const CheckIcon = props => {
  return (
    <Absolute
      flex="0 0 auto"
      right="8px"
      top="8px"
      className="checkmark"
      size="24px"
      {...props}
    >
      <Icon name="check" size="100%" />
    </Absolute>
  );
};

const StyledChoiceCard = styled(Box)`
  display: inline-flex;
  vertical-align: top;
  max-width: 12.5rem;
  text-align: center;
  user-select: none;
  background-color: #fff;
  transition: all 0.2s;
  border-width: 1px;
  cursor: pointer;
  position: relative;

  .checkmark {
    opacity: 0;
  }

  &:active,
  &.choice-card--active {
    background-color: ${themeGet("colors.blue.50")};
  }

  input:checked + & {
    color: ${themeGet("colors.blue.500")};
    border-color: currentColor;

    .checkmark {
      opacity: 1;
      color: currentColor;
    }
  }

  input:focus + & {
    box-shadow: ${themeGet("shadows.focusring")};
  }

  &.choice-card--full {
    width: 100%;
  }

  input:disabled + & {
    background-color: ${themeGet("colors.gray.200")};
    box-shadow: none;
    color: ${themeGet("colors.gray.500")};
    cursor: not-allowed;
  }
`;

const ChoiceCard = forwardRef(
  (
    {
      isFullWidth,
      children,
      className,
      isChecked,
      isDisabled,
      isFocused,
      isActive,
      id,
      showCheckmark,
      type = "radio",
      ...rest
    },
    ref
  ) => {
    return (
      <label htmlFor={id}>
        <VisuallyHidden
          as="input"
          type={type}
          id={id}
          ref={ref}
          checked={isChecked}
          disabled={isDisabled}
          {...rest}
        />
        <StyledChoiceCard borderRadius="md">
          {showCheckmark && <CheckIcon />}
          <Flex
            flexDirection="column"
            width="100%"
            justifyContent="center"
            alignItems="center"
          >
            {typeof children === "function"
              ? children({ isChecked: isChecked || rest.defaultChecked })
              : children}
          </Flex>
        </StyledChoiceCard>
      </label>
    );
  }
);

ChoiceCard.propTypes = {
  type: oneOf(["radio", "checkbox"])
};

const ChoiceGroup = ({
  value,
  defaultValue,
  name: nameProp,
  onChange,
  spacing,
  inline,
  isFullWidth,
  showCheckmark,
  type,
  id,
  label,
  children,
  ...rest
}) => {
  let isRadio = type === "radio";
  let inputName = genId("radio");
  let inputType = isRadio ? "radiogroup" : "checkboxgroup";

  const clones = Children.map(children, child => {
    let isChecked = isRadio
      ? value === child.props.value
      : value.includes(child.props.value);

    let defaultChecked = isRadio
      ? defaultValue === child.props.value
      : defaultValue.includes(child.props.value);

    let name = isRadio ? nameProp || inputName : child.props.name;

    return cloneElement(child, {
      name,
      onChange,
      isFullWidth,
      showCheckmark,
      type,
      ...(value && { isChecked }),
      ...(defaultValue && { defaultChecked })
    });
  });

  return (
    <Box role={inputType} aria-labelledby={id} {...rest}>
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <List spacing={spacing} inline={inline}>
        {clones}
      </List>
    </Box>
  );
};

export default ChoiceGroup;
export { ChoiceCard };
