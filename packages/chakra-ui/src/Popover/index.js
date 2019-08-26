/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useId } from "@reach/auto-id";
import Portal from "@reach/portal";
import { cloneElement, Fragment, useEffect, useRef } from "react";
import { Manager, Popper, Reference } from "react-popper";
import Box from "../Box";
import { useColorMode } from "../ColorModeProvider";
import useDisclosure from "../useDisclosure";
import { assignRef } from "../utils";
import FocusLock from "react-focus-lock";
import {
  PopoverCloseButton,
  PopoverContent,
  PopoverTransition,
} from "./components";

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
  usePortal = true,
  onOpenChange,
  trapFocus = false,
  closeOnBlur = true,
  closeOnEsc = true,
  ...rest
}) => {
  const { isOpen, onClose, onToggle } = useDisclosure(defaultOpen);
  const triggerRef = useRef();
  const popperRef = useRef();

  useEffect(() => {
    onOpenChange && onOpenChange(isOpen);
  }, [isOpen, onOpenChange]);

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

  const bg = rest.bg || rest.background || rest.backgroundColor || _bgColor;
  const popoverId = `popper-${useId()}`;
  const PopperWrapper = usePortal ? Portal : Fragment;

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
              onToggle();
              trigger.props.onClick && trigger.props.onClick(event);
            },
          })
        }
      </Reference>

      <PopperWrapper>
        <Popper placement={placement}>
          {({ ref, style: popperStyle, placement, arrowProps }) => (
            <PopoverTransition duration={100} isOpen={isOpen}>
              {styles => (
                <FocusLock
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus={false}
                  returnFocus
                >
                  <PopoverContent
                    ref={node => {
                      popperRef.current = node;
                      assignRef(ref, node);
                    }}
                    bg={bg}
                    maxWidth={maxWidth}
                    data-placement={placement}
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
      </PopperWrapper>
    </Manager>
  );
};

export default Popover;
export * from "./components";
