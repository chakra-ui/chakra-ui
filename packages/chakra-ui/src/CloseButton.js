/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import propTypes from "prop-types";
import Icon from "./Icon";
import { Flex } from "./Layout";
import VisuallyHidden from "./VisuallyHidden";

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
      tabindex="0"
      borderRadius="round"
      as="button"
      color={color}
      css={baseStyle}
      {...rest}
    >
      <Icon name={icon} aria-hidden="true" size={`closeButton.${size}`} />
      <VisuallyHidden>Close</VisuallyHidden>
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
