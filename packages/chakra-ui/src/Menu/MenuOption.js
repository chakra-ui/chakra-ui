/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Children, cloneElement, forwardRef, useState } from "react";
import Icon from "../Icon";
import { genId } from "../utils";
import { useMenuContext } from ".";
import { MenuGroup } from "./MenuGroup";
import { useMenuItemStyle } from "./MenuItem";
import Flex from "../Flex";
import Box from "../Box";

export const MenuItemOption = forwardRef(
  (
    {
      isDisabled,
      children,
      onSelect,
      type,
      onBlur,
      onFocus,
      isChecked,
      ...props
    },
    ref
  ) => {
    const { focusableItems, focusAtIndex } = useMenuContext();

    const role = `menuitem${type}`;

    const onClick = event => {
      if (isDisabled) {
        event.stopPropagation();
        event.preventDefault();
        return;
      }
      onSelect && onSelect();
    };

    const onKeyDown = event => {
      if (isDisabled) return;
      if (["Enter", " "].includes(event.key)) {
        event.preventDefault();
        onSelect && onSelect();
      }
    };

    const onMouseEnter = event => {
      if (isDisabled) {
        event.stopPropagation();
        event.preventDefault();
        return;
      }
      let nextIndex = focusableItems.current.indexOf(event.currentTarget);
      focusAtIndex(nextIndex);
    };

    const onMouseLeave = event => {
      focusAtIndex(-1);
    };

    const styleProps = useMenuItemStyle();

    return (
      <Flex
        ref={ref}
        as="button"
        minHeight="32px"
        alignItems="center"
        onClick={onClick}
        role={role}
        tabIndex={-1}
        aria-checked={isChecked}
        disabled={isDisabled}
        aria-disabled={isDisabled ? "" : undefined}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        {...styleProps}
        {...props}
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
      </Flex>
    );
  }
);

MenuItemOption.displayName = "MenuItemOption";

export const MenuItemRadio = props => (
  <MenuItemOption type="radio" {...props} />
);
export const MenuItemCheckbox = props => (
  <MenuItemOption type="checkbox" {...props} />
);

export const MenuOptionsGroup = ({
  children,
  type = "radio",
  title,
  value: valueProp,
  name,
  onChange
}) => {
  const [value, setValue] = useState(valueProp || "");

  const handleChange = _value => {
    if (type === "radio") {
      setValue(_value);
      onChange && onChange(_value);
    } else {
      let newValue = value.includes(_value)
        ? value.filter(i => i !== _value)
        : [...value, _value];

      setValue(newValue);
      onChange && onChange(newValue);
    }
  };

  return (
    <MenuGroup title={title}>
      {Children.map(children, child => {
        let typeProps =
          type === "radio"
            ? {
                name: name || genId("radio"),
                isChecked: child.props.value === value
              }
            : {
                name: child.props.name,
                isChecked: value.includes(child.props.value)
              };
        return cloneElement(child, {
          type,
          key: child.props.value,
          onSelect: () => handleChange(child.props.value),
          ...typeProps
        });
      })}
    </MenuGroup>
  );
};
