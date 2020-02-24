/** @jsx jsx */
import { jsx } from "@emotion/core";
import { cloneElement, useRef, Children, Fragment } from "react";
import { useColorMode } from "../ColorModeProvider";
import Box from "../Box";
import useDisclosure from "../useDisclosure";
import { useId } from "@reach/auto-id";
import Popper, { PopperArrow } from "../Popper";
import VisuallyHidden from "../VisuallyHidden";

const wrapEvent = (child, theirHandler, ourHandler) => event => {
  if (typeof child !== "string" && child.props[theirHandler]) {
    child.props[theirHandler](event);
  }

  if (!event.defaultPrevented) {
    return ourHandler(event);
  }
};

const Tooltip = ({
  label,
  "aria-label": ariaLabel,
  showDelay = 0,
  hideDelay = 0,
  placement = "auto",
  children,
  hasArrow,
  closeOnClick,
  defaultIsOpen,
  shouldWrapChildren,
  isOpen: controlledIsOpen,
  onOpen: onOpenProp,
  onClose: onCloseProp,
  ...rest
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure(defaultIsOpen || false);
  const { current: isControlled } = useRef(controlledIsOpen != null);
  const _isOpen = isControlled ? controlledIsOpen : isOpen;

  const referenceRef = useRef();
  const enterTimeoutRef = useRef();
  const exitTimeoutRef = useRef();

  const openWithDelay = () => {
    enterTimeoutRef.current = setTimeout(onOpen, showDelay);
  };

  const closeWithDelay = () => {
    clearTimeout(enterTimeoutRef.current);
    exitTimeoutRef.current = setTimeout(onClose, hideDelay);
  };

  const tooltipId = `tooltip-${useId()}`;

  const handleOpen = () => {
    if (!isControlled) {
      openWithDelay();
    }

    if (onOpenProp) {
      onOpenProp();
    }
  };

  const handleClose = () => {
    if (!isControlled) {
      closeWithDelay();
    }

    if (onCloseProp) {
      onCloseProp();
    }
  };

  const { colorMode } = useColorMode();
  const _bg = colorMode === "dark" ? "gray.300" : "gray.700";
  const _color = colorMode === "dark" ? "gray.900" : "whiteAlpha.900";

  const handleClick = wrapEvent(children, "onClick", () => {
    if (closeOnClick) {
      closeWithDelay();
    }
  });

  const referenceProps = {
    ref: referenceRef,
    onMouseEnter: wrapEvent(children, "onMouseEnter", handleOpen),
    onMouseLeave: wrapEvent(children, "onMouseLeave", handleClose),
    onClick: handleClick,
    onFocus: wrapEvent(children, "onFocus", handleOpen),
    onBlur: wrapEvent(children, "onBlur", handleClose),
    ...(_isOpen && { "aria-describedby": tooltipId }),
  };

  let clone;

  if (typeof children === "string" || shouldWrapChildren) {
    clone = (
      <Box as="span" tabIndex="0" {...referenceProps}>
        {children}
      </Box>
    );
  } else {
    clone = cloneElement(Children.only(children), referenceProps);
  }

  const hasAriaLabel = ariaLabel != null;

  return (
    <Fragment>
      {clone}

      <Popper
        usePortal
        isOpen={_isOpen}
        placement={placement}
        timeout={200}
        modifiers={{ offset: { enabled: true, offset: `0, 8` } }}
        anchorEl={referenceRef.current}
        arrowSize="10px"
        hasArrow={hasArrow}
        px="8px"
        py="2px"
        id={hasAriaLabel ? undefined : tooltipId}
        role={hasAriaLabel ? undefined : "tooltip"}
        bg={_bg}
        borderRadius="sm"
        fontWeight="medium"
        pointerEvents="none"
        color={_color}
        fontSize="sm"
        shadow="md"
        maxW="320px"
        {...rest}
      >
        {label}
        {hasAriaLabel && (
          <VisuallyHidden role="tooltip" id={tooltipId}>
            {ariaLabel}
          </VisuallyHidden>
        )}
        {hasArrow && <PopperArrow />}
      </Popper>
    </Fragment>
  );
};

export default Tooltip;
