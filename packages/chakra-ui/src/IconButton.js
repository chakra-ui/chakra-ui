/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import Icon from "./Icon";
import Button from "./Button";

const IconButton = forwardRef(
  ({ icon, isRound, "aria-label": ariaLabel, ...rest }, ref) => {
    // Since I'm reusing the Button component, I need to remove some props
    // before passing it to IconButton
    const {
      isFullWidth,
      leftIcon,
      rightIcon,
      loadingText,
      ...iconButtonProps
    } = rest;

    return (
      <Button
        style={{ padding: 0 }}
        borderRadius={isRound ? "round" : "md"}
        aria-label={ariaLabel}
        ref={ref}
        {...iconButtonProps}
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
