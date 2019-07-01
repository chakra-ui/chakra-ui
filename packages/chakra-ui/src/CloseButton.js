/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import propTypes from "prop-types";
import Icon from "./Icon";
import { Flex } from "./Layout";

const baseStyle = css({
  transition: "all 0.2s",
  opacity: 0.7,
  flex: "0 0 auto",
  "&:not([aria-disabled=true]):hover": { opacity: 1 },
  "&[aria-disabled=true]": {
    cursor: "not-allowed",
    opacity: 0.6
  }
});

const CloseButton = ({
  size,
  mode,
  isDisabled,
  color,
  icon = "close",
  "aria-label": ariaLabel = "Close",
  onClick,
  ...rest
}) => {
  return (
    <Flex
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      aria-disabled={isDisabled}
      disabled={isDisabled}
      onClick={onClick}
      aria-label={ariaLabel}
      tabindex="0"
      borderRadius="round"
      as="button"
      css={baseStyle}
      {...rest}
    >
      <Icon
        color={color}
        name={icon}
        aria-hidden
        size={`closeButton.${size}`}
      />
    </Flex>
  );
};

CloseButton.defaultProps = {
  size: "md"
};

CloseButton.propTypes = {
  size: propTypes.oneOf(["sm", "md", "lg", "xl", "2xl"])
};

export default CloseButton;
