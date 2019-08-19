/** @jsx jsx */
import { jsx } from "@emotion/core";
import Portal from "@reach/portal";
import { oneOf } from "prop-types";
import { cloneElement, useEffect, useRef, Fragment } from "react";
import FocusLock from "react-focus-lock";
import { Manager, Popper, Reference } from "react-popper";
import {
  PopoverTransition,
  PopoverContent,
  PopoverCloseButton,
} from "./components";
import { assignRef, genId } from "../utils";
import { useColorMode } from "../ColorModeProvider";
import Box from "../Box";
import useDisclosure from "../useDisclosure";

const Popover = ({
  isOpen: controlledIsOpen,
  defaultOpen,
  maxWidth = "xs",
  trigger,
  gutter,
  placement,
  children,
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
  const { isOpen, onClose, onToggle } = useDisclosure(defaultOpen);
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

  const { colorMode } = useColorMode();

  const _bgColor = colorMode === "light" ? "white" : "gray.700";
  const _color = colorMode === "light" ? "gray.900" : "whiteAlpha.900";

  const bg = rest.bg || rest.background || rest.backgroundColor || _bgColor;
  const color = rest.color || _color;
  const popoverId = genId("popper");
  const Wrapper = usePortal ? Portal : Fragment;

  return (
    <Manager>
      <Reference>
        {({ ref: referenceRef }) =>
          cloneElement(trigger, {
            "aria-haspopup": "true",
            "aria-controls": popoverId,
            ref: node => {
              triggerRef.current = node;
              assignRef(referenceRef, node);
            },
            onClick: event => {
              handleClick();
              trigger.props.onClick && trigger.props.onClick(event);
            },
          })
        }
      </Reference>

      <Wrapper>
        <Popper placement={placement}>
          {({ ref, style: popperStyle, placement, arrowProps }) => (
            <PopoverTransition duration={100} isOpen={isOpen}>
              {styles => (
                <FocusLock
                  returnFocus
                  onActivation={() => {
                    if (initialFocusRef && initialFocusRef.current) {
                      initialFocusRef.current.focus();
                    }
                  }}
                >
                  <PopoverContent
                    ref={node => {
                      popperRef.current = node;
                      assignRef(ref, node);
                    }}
                    bg={bg}
                    color={color}
                    maxWidth={maxWidth}
                    data-placement={placement}
                    borderRadius="lg"
                    boxShadow="lg"
                    id={popoverId}
                    aria-hidden={isOpen}
                    {...rest}
                    tabIndex="-1"
                    onBlur={handleBlur}
                    css={{
                      ...popperStyle,
                      transform: `${popperStyle.transform} scale(${styles.scale})`,
                      opacity: styles.opacity,
                    }}
                    onKeyDown={event => {
                      event.stopPropagation();
                      if (event.key === "Escape" && closeOnEsc) {
                        onClose && onClose();
                      }
                    }}
                  >
                    {showCloseButton && (
                      <PopoverCloseButton onClick={onClose} />
                    )}
                    {typeof children === "function"
                      ? children({ isOpen, onClose })
                      : children}
                    {showArrow && (
                      <Box
                        borderColor={bg}
                        data-arrow=""
                        ref={arrowProps.ref}
                        css={arrowProps.style}
                      />
                    )}
                  </PopoverContent>
                </FocusLock>
              )}
            </PopoverTransition>
          )}
        </Popper>
      </Wrapper>
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
  "auto-end",
];

Popover.propTypes = {
  interaction: oneOf(["hover", "click"]),
  placement: oneOf(placementOptions),
};

export default Popover;
export * from "./components";
