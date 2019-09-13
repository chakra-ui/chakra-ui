/** @jsx jsx */
import { jsx } from "@emotion/core";
import { cloneElement, useRef, Children, Fragment } from "react";
import { useColorMode } from "../ColorModeProvider";
import Box from "../Box";
import useDisclosure from "../useDisclosure";
import { useId } from "@reach/auto-id";
import Popper, { PopperArrow } from "../Popper";
import VisuallyHidden from "../VisuallyHidden";

const activeTooltip = { id: "" };

const Tooltip = ({
  color,
  label,
  "aria-label": ariaLabel,
  showDelay = 250,
  hideDelay = 500,
  placement = "auto",
  children,
  hasArrow,
  closeOnClick,
  defaultIsOpen,
  gutter,
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

  const bgColor = rest.bg || rest.backgroundColor || _bg;
  const textColor = color || _color;

  const handleClick = event => {
    if (closeOnClick) {
      closeWithDelay();
    }

    if (typeof children !== "string") {
      if (children.props.onClick) {
        children.props.onClick(event);
      }
    }
  };

  const referenceProps = {
    "aria-labelledby": tooltipId,
    ref: referenceRef,
    onMouseEnter: handleOpen,
    onMouseLeave: handleClose,
    onClick: handleClick,
    onFocus: handleOpen,
    onBlur: handleClose,
  };

  const clone =
    typeof children === "string" || shouldWrapChildren ? (
      <Box as="span" tabIndex="0" {...referenceProps}>
        {children}
      </Box>
    ) : (
      cloneElement(Children.only(children), referenceProps)
    );

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
        bg={bgColor}
        borderRadius="sm"
        fontWeight="medium"
        pointerEvents="none"
        color={textColor}
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
