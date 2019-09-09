/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import Portal from "@reach/portal";
import { cloneElement, useRef, Children, Fragment } from "react";
// import { Manager, Popper, Reference } from "react-popper";
// import { assignRef, genId } from "../utils";
import { popperStyle } from "../Popover/components";
import { useColorMode } from "../ColorModeProvider";
import Box from "../Box";
import useDisclosure from "../useDisclosure";
import { useId } from "@reach/auto-id";
import Transition from "react-transition-group/Transition";
import usePopper from "../usePopper";

export const FadeTransition = ({
  in: inProp,
  duration = 200,
  children,
  ...props
}) => {
  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  return (
    <Transition in={inProp} timeout={duration} {...props}>
      {state => children({ ...defaultStyle, ...transitionStyles[state] })}
    </Transition>
  );
};

const TooltipContent = styled(Box)`
  ${popperStyle}
`;

const Tooltip = ({
  color,
  label,
  showDelay = 100,
  hideDelay = 100,
  transitionDuration = 50,
  placement: placementProp = "auto",
  children,
  showArrow,
  closeOnClick,
  defaultIsOpen,
  gutter,
  shouldWrapChildren,
  isOpen: controlledIsOpen,
  onOpenChange,
  ...rest
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure(defaultIsOpen || false);
  const { current: isControlled } = useRef(controlledIsOpen != null);
  const _isOpen = isControlled ? controlledIsOpen : isOpen;

  const {
    placement,
    referenceRef,
    popoverRef,
    arrowRef,
    arrowStyles,
    popoverStyles,
  } = usePopper({
    placement: placementProp,
    isOpen: _isOpen,
    gutter,
  });

  const openWithDelay = () => {
    setTimeout(onOpen, showDelay);
  };

  const closeWithDelay = () => {
    setTimeout(onClose, hideDelay);
  };

  const tooltipId = `tooltip-${useId()}`;

  const handleOpen = () => {
    if (!isControlled) {
      openWithDelay();
    }

    if (onOpenChange) {
      onOpenChange(true);
    }
  };

  const handleClose = () => {
    if (!isControlled) {
      closeWithDelay();
    }

    onOpenChange && onOpenChange(false);
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

  return (
    <Fragment>
      {clone}

      <FadeTransition duration={transitionDuration} in={_isOpen}>
        {styles => (
          <Portal>
            <TooltipContent
              ref={popoverRef}
              px="8px"
              py="2px"
              id={tooltipId}
              role="tooltip"
              bg={bgColor}
              borderRadius="sm"
              fontWeight="medium"
              color={textColor}
              css={{
                ...popoverStyles,
                opacity: styles.opacity,
              }}
              data-placement={placement}
              fontSize="sm"
              boxShadow="md"
              maxWidth="320px"
              {...rest}
            >
              {label}
              {showArrow && (
                <Box
                  borderColor={bgColor}
                  data-arrow=""
                  ref={arrowRef}
                  style={arrowStyles}
                />
              )}
            </TooltipContent>
          </Portal>
        )}
      </FadeTransition>
    </Fragment>
  );
};

export default Tooltip;
