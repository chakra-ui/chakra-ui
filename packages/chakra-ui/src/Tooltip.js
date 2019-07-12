/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import Portal from "@reach/portal";
import { cloneElement, useRef } from "react";
import { Manager, Popper, Reference } from "react-popper";
import { assignRef, genId } from "./utils";
import { Box } from "./Layout";
import { PopoverTransition, popperStyle } from "./PopoverComponents";
import { useDisclosure } from "./hooks";
import { useUIMode } from "./theme";

const StyledTooltip = styled(Box)`
  ${popperStyle}
`;

const Tooltip = ({
  bg,
  color,
  label,
  delay = 100,
  children,
  showArrow,
  placement = "auto",
  closeOnClick,
  defaultIsOpen,
  isOpen: controlledIsOpen,
  onOpenChange,
  ...rest
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure(defaultIsOpen || false);
  const { current: isControlled } = useRef(controlledIsOpen != null);

  const openWithDelay = () => {
    setTimeout(onOpen, delay);
  };

  const closeWithDelay = () => {
    setTimeout(onClose, delay);
  };

  let tooltipId = genId("tooltip");

  const handleOpen = () => {
    !isControlled && openWithDelay();
    onOpenChange && onOpenChange();
  };

  const handleClose = () => {
    !isControlled && closeWithDelay();
    onOpenChange && onOpenChange();
  };

  const open = isControlled ? controlledIsOpen : isOpen;

  const { mode } = useUIMode();
  const bgFromUIMode = mode === "dark" ? "white" : "gray.700";
  const colorFromUIMode = mode === "dark" ? "gray.900" : "alpha.900";

  const bgColor = bg || bgFromUIMode;
  const textColor = color || colorFromUIMode;

  return (
    <Manager>
      <Reference>
        {({ ref: referenceRef }) =>
          cloneElement(children, {
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
            onBlur: handleClose
          })
        }
      </Reference>
      <Popper placement={placement}>
        {({ ref: popperRef, style, arrowProps, placement }) => (
          <PopoverTransition duration={50} isOpen={open}>
            {styles => (
              <Portal>
                <StyledTooltip
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
                    // transform: `${style.transform} scale(${styles.scale})`,
                    opacity: styles.opacity
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
                </StyledTooltip>
              </Portal>
            )}
          </PopoverTransition>
        )}
      </Popper>
    </Manager>
  );
};

export default Tooltip;
