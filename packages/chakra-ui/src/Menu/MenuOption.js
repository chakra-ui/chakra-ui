/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Children, cloneElement, forwardRef, useState, useRef } from "react";
import Icon from "../Icon";
import { useId } from "@reach/auto-id";
import { useMenuContext } from ".";
import { MenuGroup } from ".";
import { useMenuItemStyle } from "./styles";
import PseudoBox from "../PseudoBox";
import Box from "../Box";

export const MenuItemOption = forwardRef(
  (
    {
      isDisabled,
      children,
      onClick,
      type,
      onMouseLeave,
      onMouseEnter,
      onKeyDown,
      isChecked,
      ...rest
    },
    ref,
  ) => {
    const { focusableItems, focusAtIndex } = useMenuContext();

    const role = `menuitem${type}`;

    const handleClick = event => {
      if (isDisabled) {
        event.stopPropagation();
        event.preventDefault();
        return;
      }
      onClick && onClick();
    };

    const handleKeyDown = event => {
      if (isDisabled) return;
      if (["Enter", " "].includes(event.key)) {
        event.preventDefault();
        onClick && onClick();
      }

      if (onKeyDown) {
        onKeyDown(event);
      }
    };

    const handleMouseEnter = event => {
      if (isDisabled) {
        event.stopPropagation();
        event.preventDefault();
        return;
      }
      let nextIndex = focusableItems.current.indexOf(event.currentTarget);
      focusAtIndex(nextIndex);

      if (onMouseEnter) {
        onMouseEnter(event);
      }
    };

    const handleMouseLeave = event => {
      focusAtIndex(-1);
      if (onMouseLeave) {
        onMouseLeave(event);
      }
    };

    const styleProps = useMenuItemStyle();

    return (
      <PseudoBox
        ref={ref}
        as="button"
        display="flex"
        minHeight="32px"
        alignItems="center"
        onClick={handleClick}
        role={role}
        tabIndex={-1}
        aria-checked={isChecked}
        disabled={isDisabled}
        aria-disabled={isDisabled ? "" : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        {...styleProps}
        {...rest}
      >
        <Icon
          name="check"
          opacity={isChecked ? 1 : 0}
          color="currentColor"
          size="1em"
          ml="1rem"
          mr="-4px"
          aria-hidden
          data-menuitem-icon=""
        />
        <Box textAlign="left" as="span" mx="1rem" flex="1">
          {children}
        </Box>
      </PseudoBox>
    );
  },
);

export const MenuOptionGroup = ({
  children,
  type = "radio",
  name,
  title,
  value: valueProp,
  defaultValue,
  onChange,
  ...rest
}) => {
  const [value, setValue] = useState(defaultValue || "");
  const { current: isControlled } = useRef(valueProp != null);

  const derivedValue = isControlled ? valueProp : value;

  const handleChange = _value => {
    if (type === "radio") {
      !isControlled && setValue(_value);
      onChange && onChange(_value);
    }

    if (type === "checkbox") {
      let newValue = derivedValue.includes(_value)
        ? derivedValue.filter(itemValue => itemValue !== _value)
        : [...derivedValue, _value];

      !isControlled && setValue(newValue);
      onChange && onChange(newValue);
    }
  };

  const fallbackName = `radio-${useId()}`;

  return (
    <MenuGroup title={title} {...rest}>
      {Children.map(children, child => {
        if (type === "radio") {
          return cloneElement(child, {
            type,
            key: child.props.value,
            onClick: event => {
              handleChange(child.props.value);
              if (child.props.onClick) {
                child.props.onClick(event);
              }
            },
            name: name || fallbackName,
            isChecked: child.props.value === derivedValue,
          });
        }

        if (type === "checkbox") {
          return cloneElement(child, {
            type,
            key: child.props.value,
            onClick: event => {
              handleChange(child.props.value);
              if (child.props.onClick) {
                child.props.onClick(event);
              }
            },
            isChecked: derivedValue.includes(child.props.value),
          });
        }
      })}
    </MenuGroup>
  );
};
