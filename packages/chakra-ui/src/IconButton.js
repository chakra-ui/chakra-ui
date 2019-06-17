/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import Icon from "./Icon";
import Button from "./Button";
import VisuallyHidden from "./VisuallyHidden";

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
        css={{ padding: 0 }}
        borderRadius={isRound ? "round" : "md"}
        ref={ref}
        {...iconButtonProps}
      >
        {ariaLabel && <VisuallyHidden>{ariaLabel}</VisuallyHidden>}
        <Icon name={icon} color="currentColor" aria-hidden />
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";
IconButton.propTypes = Button.propTypes;
IconButton.defaultProps = Button.defaultProps;

export default IconButton;
