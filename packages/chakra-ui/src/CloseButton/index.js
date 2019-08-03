/** @jsx jsx */
import { jsx } from "@emotion/core";
import Icon from "../Icon";
import PseudoBox from "../PseudoBox";
import { useUIMode } from "../ThemeProvider";

const baseProps = ({ mode }) => {
  return {
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
  icon = "close",
  "aria-label": ariaLabel = "Close",
  onClick,
  ...rest
}) => {
  const { mode } = useUIMode();
  const _size = sizes[size];

  return (
    <PseudoBox
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      aria-disabled={isDisabled}
      disabled={isDisabled}
      onClick={onClick}
      aria-label={ariaLabel}
      tabindex="0"
      rounded="md"
      as="button"
      size={_size.button}
      {...baseProps({ mode })}
      {...rest}
    >
      <Icon
        color={color}
        focusable="false"
        name={icon}
        aria-hidden
        size={_size.icon}
      />
    </PseudoBox>
  );
};

export default CloseButton;
