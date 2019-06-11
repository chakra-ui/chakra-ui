/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { themeGet } from "@styled-system/theme-get";
import Icon from "./Icon";
import Text from "./Text";

const hoverSelector = "&:not([aria-disabled=true]):hover",
  activeSelector = "&:not([aria-disabled=true]):active",
  disabledSelector = "&[aria-disabled=true]",
  focusSelector = "&:not([aria-disabled=true]):focus";

const baseStyle = css({
  textShadow: `0 0 1px transparent`,
  transition: `all 0.15s ease-out`,
  textDecoration: "none",
  cursor: "pointer"
});

const focusStyle = props =>
  css({
    [focusSelector]: {
      boxShadow: themeGet(`shadows.focusring`)(props)
    }
  });

const disabledStyle = props =>
  css({
    [disabledSelector]: {
      color: themeGet("colors.gray.400")(props),
      cursor: "not-allowed",
      textDecoration: "none !important"
    }
  });

const colorStyle = props =>
  css({
    color: themeGet(`colors.${props.linkColor}.500`)(props),
    [hoverSelector]: {
      color: themeGet(`colors.${props.linkColor}.600`)(props),
      textDecoration: "underline"
    },
    [activeSelector]: {
      color: themeGet(`colors.${props.linkColor}.400`)(props)
    }
  });

const unstyledLinkStyle = css({
  color: "inherit !important",
  textDecoration: "none !important"
});

const StyledLink = styled(Text)(
  baseStyle,
  disabledStyle,
  focusStyle,
  colorStyle,
  props => props.isStyled === false && unstyledLinkStyle(props)
);

const Link = ({
  isExternal,
  children,
  isDisabled,
  target,
  color = "blue",
  isStyled,
  onClick,
  as = "a",
  ...rest
}) => {
  return (
    <StyledLink
      as={as}
      target={isExternal ? "_blank" : target}
      rel={isExternal ? "noopener noreferrer" : rest.rel}
      linkColor={color}
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled}
      borderRadius="sm"
      isStyled={isStyled}
      onClick={isDisabled ? e => e.preventDefault() : onClick}
      {...rest}
    >
      {children}
      {isExternal && (
        <Icon
          ml={1}
          position="relative"
          top={-1}
          color={isDisabled ? "gray.300" : "gray.400"}
          name="external-link"
          aria-label="Link opens in a new window"
        />
      )}
    </StyledLink>
  );
};

export default Link;
