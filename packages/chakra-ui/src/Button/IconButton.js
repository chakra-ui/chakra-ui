/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import Button from ".";
import Icon from "../Icon";

const IconButton = forwardRef(
  ({ icon, isRound, "aria-label": ariaLabel, ...rest }, ref) => {
    // Remove some propsß before passing it to IconButton
    const { isFullWidth, leftIcon, rightIcon, loadingText, ...props } = rest;

    return (
      <Button
        css={{ padding: 0 }}
        borderRadius={isRound ? "round" : "md"}
        ref={ref}
        aria-label={ariaLabel}
        {...props}
      >
        <Icon name={icon} color="currentColor" aria-hidden />
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";
IconButton.propTypes = Button.propTypes;
IconButton.defaultProps = Button.defaultProps;

export default IconButton;
