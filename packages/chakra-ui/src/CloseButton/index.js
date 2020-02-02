/** @jsx jsx */
import { jsx } from "@emotion/core";
import Icon from "../Icon";
import PseudoBox from "../PseudoBox";
import { useColorMode } from "../ColorModeProvider";

const baseProps = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  rounded: "md",
  transition: "all 0.2s",
  flex: "0 0 auto",
  _hover: { bg: "blackAlpha.100" },
  _active: { bg: "blackAlpha.200" },
  _disabled: {
    cursor: "not-allowed",
  },
  _focus: {
    boxShadow: "outline",
  },
};

const sizes = {
  lg: {
    button: "40px",
    icon: "16px",
  },
  md: {
    button: "32px",
    icon: "12px",
  },
  sm: {
    button: "24px",
    icon: "10px",
  },
};

const CloseButton = ({
  size = "md",
  isDisabled,
  color,
  "aria-label": ariaLabel = "Close",
  ...rest
}) => {
  const { colorMode } = useColorMode();
  const hoverColor = { light: "blackAlpha.100", dark: "whiteAlpha.100" };
  const activeColor = { light: "blackAlpha.200", dark: "whiteAlpha.200" };

  const buttonSize = sizes[size] && sizes[size]["button"];
  const iconSize = sizes[size] && sizes[size]["icon"];

  return (
    <PseudoBox
      as="button"
      outline="none"
      aria-disabled={isDisabled}
      disabled={isDisabled}
      aria-label={ariaLabel}
      size={buttonSize}
      _hover={{ bg: hoverColor[colorMode] }}
      _active={{ bg: activeColor[colorMode] }}
      type="button"
      {...baseProps}
      {...rest}
    >
      <Icon
        color={color}
        focusable="false"
        name="close"
        aria-hidden
        size={iconSize}
      />
    </PseudoBox>
  );
};

export default CloseButton;
