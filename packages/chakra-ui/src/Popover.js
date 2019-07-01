/** @jsx jsx */
import { jsx } from "@emotion/core";
import Portal from "@reach/portal";
import { oneOf } from "prop-types";
import { cloneElement, useEffect, useRef } from "react";
import FocusLock from "react-focus-lock";
import { Manager, Popper, Reference } from "react-popper";
import { useDisclosure } from "./hooks";
import { Box } from "./Layout";
import {
  PopoverTransition,
  PopoverWrapper,
  PopoverCloseButton
} from "./PopoverComponents";
import { assignRef, genId } from "./utils";
import { useUIMode } from "./ThemeProvider";

const Popover = ({
  isOpen: controlledIsOpen,
  defaultIsOpen,
  size = "2xs",
  trigger,
  gutter,
  placement,
  animation,
  children,
  bg,
  color,
  showArrow,
  showCloseButton,
  initialFocusRef,
  usePortal = true,
  onOpenChange,
  trapFocus = false,
  closeOnBlur,
  closeOnEsc = true,
  ...rest
}) => {
  const { isOpen, onClose, onToggle } = useDisclosure(defaultIsOpen);
  const triggerRef = useRef();
  const popperRef = useRef();

  useEffect(() => {
    onOpenChange && onOpenChange();
  }, [isOpen, onOpenChange]);

  const handleClick = () => {
    onToggle();
  };

  /* Close on outside click and blur for the Menu */
  const handleBlur = event => {
    if (
      !trapFocus &&
      isOpen &&
      popperRef.current &&
      triggerRef.current &&
      !popperRef.current.contains(event.relatedTarget) &&
      !triggerRef.current.contains(event.relatedTarget)
    ) {
      closeOnBlur && onClose();
    }
  };

  const {mode} = useUIMode();
  const bgFromUIMode = mode === "light" ? "white" : "gray.700";
  const colorFromUIMode = mode === "light" ? "gray.900" : "alpha.900";

  const bgColor = bg || bgFromUIMode;
  const textColor = color || colorFromUIMode;

  const popperContent = (
    <Popper placement={placement}>
      {({ ref, style: popperStyle, placement, arrowProps }) => (
        <PopoverTransition duration={100} isOpen={isOpen}>
          {styles => (
            <FocusLock
              returnFocus
              onActivation={() => {
                return (
                  initialFocusRef &&
                  initialFocusRef.current &&
                  initialFocusRef.current.focus()
                );
              }}
            >
              <PopoverWrapper
                ref={node => {
                  popperRef.current = node;
                  assignRef(ref, node);
                }}
                bg={bgColor}
                color={textColor}
                maxWidth={size}
                data-placement={placement}
                css={{
                  ...popperStyle,
                  transform: `${popperStyle.transform} scale(${styles.scale})`,
                  opacity: styles.opacity
                }}
                borderRadius="lg"
                boxShadow="lg"
                id={popperId}
                aria-hidden={isOpen}
                {...rest}
                onBlur={handleBlur}
                onKeyDown={event => {
                  event.stopPropagation();
                  if (event.key === "Escape" && closeOnEsc) onClose();
                }}
                tabIndex="-1"
              >
                {showCloseButton && <PopoverCloseButton onClick={onClose} />}
                {typeof children === "function"
                  ? children({ isOpen, onClose })
                  : children}
                {showArrow && (
                  <Box
                    borderColor={bgColor}
                    data-arrow=""
                    ref={arrowProps.ref}
                    style={arrowProps.style}
                  />
                )}
              </PopoverWrapper>
            </FocusLock>
          )}
        </PopoverTransition>
      )}
    </Popper>
  );

  let popperId = genId("popper");

  return (
    <Manager>
      <Reference>
        {({ ref: referenceRef }) =>
          cloneElement(trigger, {
            "aria-haspopup": "true",
            "aria-controls": popperId,
            ref: node => {
              triggerRef.current = node;
              assignRef(referenceRef, node);
            },
            onClick: event => {
              handleClick();
              trigger.props.onClick && trigger.props.onClick(event);
            }
          })
        }
      </Reference>
      {usePortal ? <Portal>{popperContent}</Portal> : popperContent}
    </Manager>
  );
};
export const placementOptions = [
  "left",
  "right",
  "bottom",
  "auto",
  "top",
  "right-end",
  "right-start",
  "left-end",
  "left-start",
  "bottom-end",
  "bottom-start",
  "top-end",
  "top-start",
  "auto-start",
  "auto-end"
];

Popover.propTypes = {
  interaction: oneOf(["hover", "click"]),
  placement: oneOf(placementOptions)
};
Popover.displayName = "Popover";

export default Popover;
