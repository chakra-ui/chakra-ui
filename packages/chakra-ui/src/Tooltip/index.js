/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import Portal from "@reach/portal";
import { cloneElement, useRef, Children, Fragment } from "react";
import { useColorMode } from "../ColorModeProvider";
import Box from "../Box";
import useDisclosure from "../useDisclosure";
import { useId } from "@reach/auto-id";
import CSSTransition from "react-transition-group/CSSTransition";
import usePopper from "../usePopper";
import getPopperArrowStyle from "../usePopper/styles";

export const Fade = ({ in: inProp, timeout = 200, children, ...props }) => {
  const child = Children.only(children);

  const fadeStyle = {
    "&.fade-enter": {
      opacity: 0.01,
    },
    "&.fade-enter-active": {
      opacity: 1,
      transition: `opacity ${timeout}ms ease`,
    },
    "&.fade-exit": {
      opacity: 1,
    },
    "&.fade-exit-active": {
      opacity: 0.01,
      transition: `opacity ${timeout}ms ease`,
    },
  };

  return (
    <CSSTransition
      in={inProp}
      timeout={timeout}
      appear
      unmountOnExit
      classNames="fade"
      {...props}
    >
      {cloneElement(child, { css: [child.props.css, fadeStyle] })}
    </CSSTransition>
  );
};

const TooltipContent = styled(Box)`
  ${getPopperArrowStyle({ arrowSize: "8px" })}
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

      <Portal>
        <Fade duration={transitionDuration} in={_isOpen}>
          <TooltipContent
            ref={popoverRef}
            px="8px"
            py="2px"
            id={tooltipId}
            role="tooltip"
            bg={bgColor}
            borderRadius="sm"
            fontWeight="medium"
            pointerEvents="none"
            color={textColor}
            css={popoverStyles}
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
        </Fade>
      </Portal>
    </Fragment>
  );
};

export default Tooltip;
