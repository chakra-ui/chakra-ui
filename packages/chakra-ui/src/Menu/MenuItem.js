/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { func, node, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import Icon from "../Icon";
import { Box, Flex } from "../Layout";
import { useTheme, useUIMode } from "../theme";
import { useMenuContext } from "./Menu";

const baseStyle = css({
  width: "100%",
  flex: " 0 0 auto",
  userSelect: "none",
  transition: "background-color 220ms, color 220ms"
});

const interactionStyle = ({ theme, mode }) => {
  const { gray, alpha } = theme.colors;

  const _focusColor = { light: gray[100], dark: alpha[100] };
  const _activeColor = { light: gray[200], dark: alpha[200] };

  return css({
    "&:not([aria-disabled]):active": {
      backgroundColor: _activeColor[mode]
    },
    "&:focus, &[aria-expanded=true]": {
      backgroundColor: _focusColor[mode]
    }
  });
};

const disabledStyle = css({
  "&[aria-disabled]": {
    opacity: 0.5,
    cursor: "not-allowed"
  }
});

const menuItemRadioStyle = ({ theme, mode }) => {
  const checkedColor = {
    light: theme.colors.blue[600],
    dark: theme.colors.blue[200]
  };

  return css({
    "&[role=menuitemradio], &[role=menuitemcheckbox]": {
      "[data-menuitem-icon]": {
        display: "none"
      },

      "&[aria-checked=true]": {
        color: checkedColor[mode],

        "[data-menuitem-icon]": {
          display: "block"
        }
      }
    }
  });
};

export const useMenuItemStyle = () => {
  const theme = useTheme();
  const { mode } = useUIMode();
  const props = { theme, mode };

  return css`
    ${baseStyle}
    ${interactionStyle(props)}
    ${disabledStyle}
    ${menuItemRadioStyle(props)}
  `;
};

export const MenuItem = forwardRef(
  (
    {
      isDisabled,
      icon,
      css,
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

    const onMouseLeave = () => {
      focusAtIndex(-1);
    };

    const menuItemStyle = useMenuItemStyle();

    return (
      <Flex
        ref={ref}
        minHeight="32px"
        alignItems="center"
        onClick={onClick}
        css={[menuItemStyle, css]}
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
            opacity={0.8}
            whiteSpace="nowrap"
            data-menuitem-label=""
          >
            {label}
            {hasSubmenu && <Icon name="chevronRight" size="1.5em" />}
          </Box>
        )}
      </Flex>
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
