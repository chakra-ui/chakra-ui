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

const TooltipContent = styled(Box)`
  ${popperStyle}
`;

const Tooltip = ({
  bg,
  color,
  label,
  timeout = 100,
  children,
  showArrow,
  placement = "auto",
  closeOnClick,
  defaultOpen,
  isOpen: controlledIsOpen,
  onOpenChange,
  ...rest
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure(defaultOpen || false);
  const { current: isControlled } = useRef(controlledIsOpen != null);

  const openWithDelay = () => {
    setTimeout(onOpen, timeout);
  };

  const closeWithDelay = () => {
    setTimeout(onClose, timeout);
  };

  const tooltipId = genId("tooltip");

  const handleOpen = () => {
    !isControlled && openWithDelay();
    onOpenChange && onOpenChange();
  };

  const handleClose = () => {
    !isControlled && closeWithDelay();
    onOpenChange && onOpenChange();
  };

  const _isOpen = isControlled ? controlledIsOpen : isOpen;

  const { mode } = useColorMode();
  const _bg = mode === "dark" ? "gray.300" : "gray.700";
  const _color = mode === "dark" ? "gray.900" : "whiteAlpha.900";

  const bgColor = bg || _bg;
  const textColor = color || _color;

  return (
    <Manager>
      <Reference>
        {({ ref: referenceRef }) =>
          cloneElement(Children.only(children), {
            "aria-labelledby": tooltipId,
            ref: node => {
              assignRef(referenceRef, node);
            },
            onMouseOver: handleOpen,
            onMouseLeave: handleClose,
            onClick: event => {
              closeOnClick && closeWithDelay();
              children.props.onClick && children.props.onClick(event);
            },
            onFocus: handleOpen,
            onBlur: handleClose,
          })
        }
      </Reference>
      <Popper placement={placement}>
        {({ ref: popperRef, style, arrowProps, placement }) => (
          <PopoverTransition duration={50} isOpen={_isOpen}>
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
