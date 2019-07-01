/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import { func, string, oneOfType, node } from "prop-types";
import styled from "@emotion/styled";
import { Flex, Box } from "../Layout";
import Icon from "../Icon";
import { themeGet } from "@styled-system/theme-get";
import { useMenuContext } from "./MenuContext";

export const StyledItem = styled(Flex)`
  width: 100%;
  flex: 0 0 auto;
  user-select: none;
  transition: background-color 220ms, color 220ms;

  &:not([aria-disabled]):active {
    background-color: ${props => themeGet("colors.gray.200")(props)};
  }

  &:focus,
  &[aria-expanded="true"] {
    background-color: ${props => themeGet("colors.gray.100")(props)};
  }

  &[role="menuitemradio"],
  &[role="menuitemcheckbox"] {
    svg {
      display: none;
    }
    &[aria-checked="true"] {
      color: ${props => themeGet("colors.blue.600")(props)};
      svg {
        display: block;
      }
    }
  }

  &[aria-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const MenuItem = forwardRef(
  (
    {
      isDisabled,
      icon,
      as,
      children,
      label,
      hasSubmenu,
      onSelect,
      onBlur,
      onFocus,
      role,
      ...props
    },
    ref
  ) => {
    const { focusableItems, focusAtIndex } = useMenuContext();

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

    const onMouseMove = event => {
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

    return (
      <StyledItem
        ref={ref}
        minHeight="32px"
        alignItems="center"
        as={as}
        onClick={onClick}
        role={role}
        tabIndex={-1}
        disabled={isDisabled}
        aria-disabled={isDisabled ? "" : undefined}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        {...props}
      >
        {icon && (
          <Icon
            ml="16px"
            mr="-4px"
            name={icon}
            color="currentColor"
            size="1em"
            aria-hidden
            data-menuitem-icon=""
          />
        )}
        <Box textAlign="left" as="span" mx="16px" flex="1">
          {children}
        </Box>
        {(label || hasSubmenu) && (
          <Box
            fontSize="sm"
            color="currentColor"
            flex="0 0 auto"
            mr="16px"
            whiteSpace="nowrap"
            data-menuitem-label=""
          >
            {label}
            {hasSubmenu && <Icon name="chevronRight" size="1.5em" />}
          </Box>
        )}
      </StyledItem>
    );
  }
);

MenuItem.propTypes = {
  as: oneOfType([string, func]),
  onSelect: func,
  icon: string,
  role: string,
  children: node,
  label: oneOfType([node, string])
};

MenuItem.defaultProps = {
  as: "button",
  role: "menuitem",
  onSelect: () => {}
};

MenuItem.displayName = "MenuItem";
