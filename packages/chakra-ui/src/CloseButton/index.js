/** @jsx jsx */
import { jsx } from "@emotion/core";
import Icon from "../Icon";
import PseudoBox from "../PseudoBox";
import { useUIMode } from "../ThemeProvider";

const baseProps = ({ mode }) => {
  const hover = { light: "gray.100", dark: "alpha.100" };
  return {
    transition: "all 0.2s",
    flex: "0 0 auto",
    _hover: { bg: hover[mode] },
    _disabled: {
      cursor: "not-allowed"
    },
    _focus: {
      boxShadow: "outline"
    }
  };
};

const sizes = {
  md: {
    button: "32px",
    icon: "12px"
  }
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
      rounded="full"
      as="button"
      size={_size.button}
      {...baseProps({ mode })}
      {...rest}
    >
      <Icon color={color} name={icon} aria-hidden size={_size.icon} />
    </PseudoBox>
  );
};

export default CloseButton;
