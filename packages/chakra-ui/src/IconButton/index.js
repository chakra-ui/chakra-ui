/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import propTypes from "prop-types";
import Icon from "../Icon";
import Button from "../Button";
import Box from "../Box";

const IconButton = forwardRef(
  ({ icon, isRound, "aria-label": ariaLabel, ...rest }, ref) => {
    // Remove some props before passing it to IconButton
    const { isFullWidth, leftIcon, rightIcon, loadingText, ...props } = rest;

    return (
      <Button
        p="0"
        borderRadius={isRound ? "round" : "md"}
        ref={ref}
        aria-label={ariaLabel}
        {...props}
      >
        {typeof icon === "string" ? (
          <Icon
            name={icon}
            focusable="false"
            color="currentColor"
            aria-hidden
          />
        ) : (
          <Box as={icon} aria-hidden focusable="false" color="currentColor" />
        )}
      </Button>
    );
  },
);

IconButton.propTypes = {
  icon: propTypes.oneOfType([
    propTypes.string,
    propTypes.func,
    propTypes.object,
  ]).isRequired,
  /**
   * If `true`, the button will be perfectly round. Else, it'll be slightly round
   */
  isRound: propTypes.bool,
  /**
   * A11y: A label that describes the button
   */
  "aria-label": propTypes.string.isRequired,
};

IconButton.defaultProps = Button.defaultProps;

export default IconButton;
