/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useId } from "@reach/auto-id";
import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import Box from "../Box";
import CloseButton from "../CloseButton";
import { useColorMode } from "../ColorModeProvider";
import usePopper from "../usePopper";
import usePrevious from "../usePrevious";
import {
  PopoverContent as PopoverContentBase,
  ScaleTransition,
} from "./components";

const PopoverContext = createContext();
const usePopoverContext = () => useContext(PopoverContext);

export const PopoverTrigger = ({ children }) => {
  const { referenceRef, popoverId, onToggle } = usePopoverContext();
  const child = Children.only(children);
  return cloneElement(child, {
    "aria-haspopup": "true",
    "aria-controls": popoverId,
    ref: referenceRef,
    onClick: event => {
      onToggle();
      if (child.props.onClick) {
        child.props.onClick(event);
      }
    },
  });
};

export const PopoverArrow = props => {
  const { colorMode } = useColorMode();
  const borderColor = colorMode === "light" ? "white" : "gray.700";
  const { arrowRef, arrowStyles } = usePopoverContext();
  return (
    <Box
      borderColor={borderColor}
      data-arrow=""
      ref={arrowRef}
      css={arrowStyles}
      {...props}
    />
  );
};

export const PopoverCloseButton = ({ onClick, ...props }) => {
  const { onClose } = usePopoverContext();
  return (
    <CloseButton
      size="sm"
      onClick={onClose}
      position="absolute"
      rounded="md"
      top="12px"
      right="12px"
      p="6px"
      {...props}
    />
  );
};

export const PopoverContent = ({ onKeyDown, onBlur: onBlurProp, ...props }) => {
  const {
    popoverRef,
    placement,
    popoverId,
    isOpen,
    onBlur,
    popoverStyles,
    closeOnEsc,
    onClose,
    initialFocusRef,
  } = usePopoverContext();

  const { colorMode } = useColorMode();
  const bg = colorMode === "light" ? "white" : "gray.700";

  return (
    <ScaleTransition
      in={isOpen}
      onEntered={node => {
        if (initialFocusRef) {
          initialFocusRef.current.focus();
        }
        console.log(node);
      }}
      appear
      unmountOnExit
    >
      {transitionStyles => (
        <PopoverContentBase
          bg={bg}
          ref={popoverRef}
          maxWidth="200px"
          data-placement={placement}
          id={popoverId}
          aria-hidden={!isOpen}
          tabIndex="-1"
          onBlur={event => {
            onBlur(event);
            if (onBlurProp) {
              onBlurProp(event);
            }
          }}
          css={{
            transition: transitionStyles.transition,
            position: "absolute",
            ...popoverStyles,
            transform: `${popoverStyles.transform}`,
            opacity: transitionStyles.opacity,
          }}
          onKeyDown={event => {
            if (event.key === "Escape" && closeOnEsc) {
              onClose && onClose();
            }

            if (onKeyDown) {
              onKeyDown(event);
            }
          }}
          {...props}
        />
      )}
    </ScaleTransition>
  );
};

const Popover = ({
  isOpen: isOpenProp,
  initialFocusRef,
  defaultIsOpen,
  gutter,
  placement: placementProp,
  children,
  closeOnBlur = true,
  closeOnEsc = true,
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen || false);
  const { current: isControlled } = useRef();

  const _isOpen = isControlled ? isOpenProp : isOpen;

  const onToggle = () => {
    if (!isControlled) {
      setIsOpen(!_isOpen);
    }

    if (onOpenChange) {
      onOpenChange(!_isOpen);
    }
  };

  const onClose = () => {
    if (!isControlled) {
      setIsOpen(false);
    }

    if (onOpenChange) {
      onOpenChange(false);
    }
  };

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

  const handleBlur = event => {
    if (
      isOpen &&
      closeOnBlur &&
      popoverRef.current &&
      referenceRef.current &&
      !popoverRef.current.contains(event.relatedTarget) &&
      !referenceRef.current.contains(event.relatedTarget)
    ) {
      onClose();
    }
  };

  const popoverId = `popper-${useId()}`;
  const prevIsOpen = usePrevious(isOpen);

  useEffect(() => {
    if (isOpen && popoverRef.current && !initialFocusRef) {
      popoverRef.current.focus();
    }

    if (!isOpen && prevIsOpen) {
      referenceRef.current.focus();
    }
  }, [isOpen, popoverRef, initialFocusRef, referenceRef, prevIsOpen]);

  const context = {
    popoverRef,
    referenceRef,
    popoverStyles,
    arrowStyles,
    popoverId,
    onClose,
    placement,
    isOpen,
    onToggle,
    arrowRef,
    onBlur: handleBlur,
    closeOnEsc,
    initialFocusRef,
  };

  return (
    <PopoverContext.Provider value={context}>
      {typeof children === "function"
        ? children({ isOpen, onClose })
        : children}
    </PopoverContext.Provider>
  );
};

export default Popover;
