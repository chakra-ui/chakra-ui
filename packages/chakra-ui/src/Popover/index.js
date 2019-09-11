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
import PseudoBox from "../PseudoBox";
import CloseButton from "../CloseButton";
import { useColorMode } from "../ColorModeProvider";
import usePopper from "../usePopper";
import usePrevious from "../usePrevious";
import { PopoverContent as PopoverContentBase } from "./components";
import CSSTransition from "react-transition-group/CSSTransition";

/**
 * Hook based idea:
 * const {referenceProps, popoverProps, arrowProps, state, actions} = usePopover(props).
 *
 * The popover must meet the AA Success Criterion
 * https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html
 * https://www.w3.org/WAI/WCAG21/Techniques/client-side-script/SCR39
 */

const PopoverContext = createContext();
const usePopoverContext = () => {
  const context = useContext(PopoverContext);
  if (context == null) {
    throw Error("usePopoverContext must be used within <Popover/>");
  }
  return context;
};

/////////////////////////////////////////////////////////////////////

export const PopoverTrigger = ({ children }) => {
  const {
    referenceRef,
    popoverId,
    onToggle,
    trigger,
    onOpen,
    isOpen,
    onClose,
    isHoveringRef,
  } = usePopoverContext();

  const child = Children.only(children);
  let eventHandlers = {};

  if (trigger === "click") {
    eventHandlers = {
      onClick: event => {
        onToggle();
        if (child.props.onClick) {
          child.props.onClick(event);
        }
      },
    };
  }

  if (trigger === "hover") {
    eventHandlers = {
      onFocus: event => {
        onOpen();
        if (child.props.onFocus) {
          child.props.onFocus(event);
        }
      },
      onKeyDown: event => {
        if (event.key === "Escape") {
          setTimeout(() => {
            onClose();
          }, 300);
        }
        if (child.props.onKeyDown) {
          child.props.onKeyDown(event);
        }
      },
      onBlur: event => {
        onClose();
        if (child.props.onBlur) {
          child.props.onBlur(event);
        }
      },
      onMouseEnter: event => {
        isHoveringRef.current = true;
        setTimeout(() => {
          onOpen();
        }, 300);
        if (child.props.onMouseEnter) {
          child.props.onMouseEnter(event);
        }
      },
      onMouseLeave: event => {
        isHoveringRef.current = false;
        setTimeout(() => {
          if (isHoveringRef.current === false) {
            onClose();
          }
        }, 300);
        if (child.props.onMouseLeave) {
          child.props.onMouseLeave(event);
        }
      },
    };
  }

  return cloneElement(child, {
    "aria-haspopup": "dialog",
    "aria-expanded": isOpen,
    "aria-controls": popoverId,
    ref: referenceRef,
    ...eventHandlers,
  });
};

/////////////////////////////////////////////////////////////////////

export const PopoverArrow = props => {
  const { colorMode } = useColorMode();
  const borderColor = colorMode === "light" ? "white" : "gray.700";
  const { arrowRef, arrowStyles } = usePopoverContext();

  return (
    <PseudoBox
      borderColor={borderColor}
      data-arrow=""
      ref={arrowRef}
      css={arrowStyles}
      {...props}
    />
  );
};

/////////////////////////////////////////////////////////////////////

export const PopoverCloseButton = ({ onClick, ...props }) => {
  const { onClose } = usePopoverContext();
  return (
    <CloseButton
      size="sm"
      onClick={event => {
        onClose();
        if (onClick) {
          onClick(event);
        }
      }}
      aria-label="Close dialog"
      position="absolute"
      rounded="md"
      top={1}
      right={2}
      p={2}
      {...props}
    />
  );
};

/////////////////////////////////////////////////////////////////////

export const PopoverTransition = ({
  timeout = 250,
  children,
  onEntering,
  ...rest
}) => {
  const { initialFocusRef, isOpen, trigger } = usePopoverContext();
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
      in={isOpen}
      timeout={timeout}
      appear
      unmountOnExit
      classNames="fade"
      onEntering={(node, isAppearing) => {
        if (initialFocusRef && trigger !== "hover") {
          initialFocusRef.current.focus();
        }

        if (onEntering) {
          onEntering(node, isAppearing);
        }
      }}
      {...rest}
    >
      {cloneElement(child, { css: [child.props.css, fadeStyle] })}
    </CSSTransition>
  );
};

/////////////////////////////////////////////////////////////////////

export const PopoverContent = ({
  onKeyDown,
  onBlur: onBlurProp,
  onMouseLeave,
  onMouseEnter,
  onFocus,
  hasArrow,
  arrowSize,
  arrowShadowColor,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}) => {
  const {
    popoverRef,
    placement,
    popoverId,
    isOpen,
    onBlur,
    popoverStyles,
    closeOnEsc,
    onClose,
    isHoveringRef,
    trigger,
  } = usePopoverContext();

  const { colorMode } = useColorMode();
  const bg = colorMode === "light" ? "white" : "gray.700";

  let eventHandlers = {};

  if (trigger === "click") {
    eventHandlers = {
      onBlur: event => {
        onBlur(event);
        if (onBlurProp) {
          onBlurProp(event);
        }
      },
    };
  }

  if (trigger === "hover") {
    eventHandlers = {
      onMouseEnter: event => {
        isHoveringRef.current = true;
        if (onMouseEnter) {
          onMouseEnter(event);
        }
      },
      onMouseLeave: event => {
        isHoveringRef.current = false;

        setTimeout(() => {
          onClose();
        }, 300);

        if (onMouseLeave) {
          onMouseLeave(event);
        }
      },
    };
  }

  eventHandlers = {
    ...eventHandlers,
    onKeyDown: event => {
      if (event.key === "Escape" && closeOnEsc) {
        onClose && onClose();
      }

      if (onKeyDown) {
        onKeyDown(event);
      }
    },
  };

  return (
    <PopoverTransition>
      <PopoverContentBase
        aria-label={ariaLabel}
        role="dialog"
        aria-modal="false"
        bg={bg}
        ref={popoverRef}
        data-placement={placement}
        id={popoverId}
        aria-hidden={!isOpen}
        tabIndex="-1"
        borderWidth="1px"
        arrowSize={arrowSize}
        arrowShadowColor={arrowShadowColor}
        hasArrow={hasArrow}
        css={{
          position: "absolute",
          ...popoverStyles,
        }}
        {...eventHandlers}
        {...props}
      />
    </PopoverTransition>
  );
};

/////////////////////////////////////////////////////////////////////

const Popover = ({
  isOpen: isOpenProp,
  initialFocusRef,
  defaultIsOpen,
  gutter = 4,
  trigger = "click",
  placement: placementProp,
  children,
  closeOnBlur = true,
  closeOnEsc = true,
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen || false);
  const { current: isControlled } = useRef(isOpenProp != null);

  const isHoveringRef = useRef();

  const _isOpen = isControlled ? isOpenProp : isOpen;

  const onToggle = () => {
    if (!isControlled) {
      setIsOpen(!_isOpen);
    }

    if (onOpenChange) {
      onOpenChange(!_isOpen);
    }
  };

  const onOpen = () => {
    if (!isControlled) {
      setIsOpen(true);
    }

    if (onOpenChange) {
      onOpenChange(true);
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
      _isOpen &&
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
  const prevIsOpen = usePrevious(_isOpen);

  useEffect(() => {
    if (
      _isOpen &&
      popoverRef.current &&
      !initialFocusRef &&
      trigger !== "hover"
    ) {
      popoverRef.current.focus();
    }

    if (!_isOpen && prevIsOpen && trigger !== "hover") {
      referenceRef.current.focus();
    }
  }, [_isOpen, popoverRef, initialFocusRef, trigger, referenceRef, prevIsOpen]);

  const context = {
    popoverRef,
    referenceRef,
    popoverStyles,
    arrowStyles,
    popoverId,
    onOpen,
    onClose,
    onToggle,
    placement,
    trigger,
    isOpen: _isOpen,
    arrowRef,
    onBlur: handleBlur,
    closeOnEsc,
    initialFocusRef,
    isHoveringRef,
  };

  return (
    <PopoverContext.Provider value={context}>
      {typeof children === "function"
        ? children({ isOpen: _isOpen, onClose })
        : children}
    </PopoverContext.Provider>
  );
};

export default Popover;
