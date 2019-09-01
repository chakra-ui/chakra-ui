/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import Portal from "@reach/portal";
import { cloneElement, useRef, Children } from "react";
import { Manager, Popper, Reference } from "react-popper";
import { assignRef, genId } from "../utils";
import { PopoverTransition, popperStyle } from "../Popover/components";
import { useColorMode } from "../ColorModeProvider";
import Box from "../Box";
import useDisclosure from "../useDisclosure";
import { useId } from "@reach/auto-id";

const TooltipContent = styled(Box)`
  ${popperStyle}
`;

const Tooltip = ({
  bg,
  color,
  label,
  showDelay = 100,
  hideDelay = 100,
  transitionDuration = 50,
  placement = "auto",
  children,
  showArrow,
  closeOnClick,
  defaultIsOpen,
  isOpen: controlledIsOpen,
  onOpenChange,
  ...rest
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure(defaultIsOpen || false);
  const { current: isControlled } = useRef(controlledIsOpen != null);
  const _isOpen = isControlled ? controlledIsOpen : isOpen;

  const openWithDelay = () => {
    setTimeout(onOpen, showDelay);
  };

  const closeWithDelay = () => {
    setTimeout(onClose, hideDelay);
  };

  const tooltipId = `tooltip-${useId()}`;

  const handleOpen = () => {
    !isControlled && openWithDelay();
    onOpenChange && onOpenChange();
  };

  const handleClose = () => {
    !isControlled && closeWithDelay();
    onOpenChange && onOpenChange();
  };

  const { colorMode } = useColorMode();
  const _bg = colorMode === "dark" ? "gray.300" : "gray.700";
  const _color = colorMode === "dark" ? "gray.900" : "whiteAlpha.900";

  const bgColor = bg || _bg;
  const textColor = color || _color;

  const child =
    typeof children === "string" ? children : Children.only(children);

  const handleClick = event => {
    closeOnClick && closeWithDelay();
    if (typeof children !== "string") {
      child.props.onClick && child.props.onClick(event);
    }
  };

  return (
    <Manager>
      <Reference>
        {({ ref: referenceRef }) => {
          // Props for the reference element.
          const referenceProps = {
            "aria-labelledby": tooltipId,
            ref: node => {
              assignRef(referenceRef, node);
            },
            onMouseEnter: handleOpen,
            onMouseLeave: handleClose,
            onClick: handleClick,
            onFocus: handleOpen,
            onBlur: handleClose,
          };

          // If you pass just a string to the Tooltip children,
          // let's wrap it in a span as a fallback
          if (typeof child === "string") {
            return (
              <Box as="span" {...referenceProps}>
                {child}
              </Box>
            );
          }

          return cloneElement(child, { ...referenceProps });
        }}
      </Reference>

      <Popper placement={placement}>
        {({ ref: popperRef, style, arrowProps, placement }) => (
          <PopoverTransition duration={transitionDuration} isOpen={_isOpen}>
            {styles => (
              <Portal>
                <TooltipContent
                  ref={popperRef}
                  px="8px"
                  py="2px"
                  id={tooltipId}
                  role="tooltip"
                  bg={bgColor}
                  borderRadius="sm"
                  fontWeight="medium"
                  color={textColor}
                  css={{
                    ...style,
                    transform: `${style.transform}`,
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
                      ref={arrowProps.ref}
                      style={arrowProps.style}
                    />
                  )}
                </TooltipContent>
              </Portal>
            )}
          </PopoverTransition>
        )}
      </Popper>
    </Manager>
  );
};

export default Tooltip;
