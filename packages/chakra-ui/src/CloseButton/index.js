/** @jsx jsx */
import { jsx } from "@emotion/core";
import Icon from "../Icon";
import PseudoBox from "../PseudoBox";

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
  const _size = sizes[size];

  return (
    <PseudoBox
      as="button"
      aria-disabled={isDisabled}
      disabled={isDisabled}
      aria-label={ariaLabel}
      size={_size.button}
      {...baseProps}
      {...rest}
    >
      <Icon
        color={color}
        focusable="false"
        name="close"
        aria-hidden
        size={_size.icon}
      />
    </PseudoBox>
  );
};

export default CloseButton;
