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
// import usePopper from "../usePopper";
import usePrevious from "../usePrevious";
import Popper from "../Popper";
import Fade from "../Popper/Fade";
// import { PopoverContent as PopoverContentBase } from "./components";
// import CSSTransition from "react-transition-group/CSSTransition";

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

const PopoverTrigger = ({ children }) => {
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

const PopoverArrow = props => <Box x-arrow="" {...props} />;

/////////////////////////////////////////////////////////////////////

const PopoverCloseButton = ({ onClick, ...props }) => {
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

const PopoverContent = ({
  onKeyDown,
  onBlur: onBlurProp,
  onMouseLeave,
  onMouseEnter,
  onFocus,
  hasArrow,
  arrowSize,
  arrowShadowColor,
  children,
  "aria-label": ariaLabel,
  ...props
}) => {
  const {
    popoverRef,
    referenceRef,
    placement,
    initialFocusRef,
    popoverId,
    isOpen,
    onBlur,
    closeOnEsc,
    onClose,
    isHoveringRef,
    trigger,
    hasHeadingRef,
    headerId,
    hasBodyRef,
    bodyId,
    usePortal,
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
    <Popper
      usePortal={usePortal}
      isOpen={isOpen}
      placement={placement}
      aria-label={ariaLabel}
      anchorEl={referenceRef.current}
      role="dialog"
      aria-modal="false"
      ref={popoverRef}
      bg={bg}
      id={popoverId}
      aria-hidden={!isOpen}
      tabIndex="-1"
      borderWidth="1px"
      width="100%"
      position="relative"
      display="flex"
      flexDirection="column"
      rounded="md"
      shadow="sm"
      maxWidth="xs"
      willUseTransition
      _focus={{ outline: 0, shadow: "outline" }}
      {...(hasHeadingRef.current && { "aria-labelledby": headerId })}
      {...(hasBodyRef.current && { "aria-describedby": bodyId })}
      {...eventHandlers}
      {...props}
    >
      {({ transition }) => (
        <Fade {...transition}>
          <Box role="group" bg="inherit">
            {children}
          </Box>
        </Fade>
      )}
    </Popper>
  );
};

/////////////////////////////////////////////////////////////////////

const Popover = ({
  id,
  isOpen: isOpenProp,
  initialFocusRef,
  defaultIsOpen,
  gutter = 4,
  usePortal,
  returnFocusOnClose = true,
  trigger = "click",
  placement,
  children,
  closeOnBlur = true,
  closeOnEsc = true,
  onOpen: onOpenProp,
  onClose: onCloseProp,
}) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen || false);
  const { current: isControlled } = useRef(isOpenProp != null);

  const isHoveringRef = useRef();
  const hasHeadingRef = useRef(false);
  const hasBodyRef = useRef(false);

  const referenceRef = useRef();
  const popoverRef = useRef();

  const _isOpen = isControlled ? isOpenProp : isOpen;

  const onToggle = () => {
    if (!isControlled) {
      setIsOpen(!_isOpen);
    }

    if (!_isOpen === true) {
      onOpenProp && onOpenProp();
    } else {
      onCloseProp && onCloseProp();
    }
  };

  const onOpen = () => {
    if (!isControlled) {
      setIsOpen(true);
    }

    if (onOpenProp) {
      onOpenProp();
    }
  };

  const onClose = () => {
    if (!isControlled) {
      setIsOpen(false);
    }

    if (onCloseProp) {
      onCloseProp();
    }
  };

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

  // A unique fallback id in case the id prop wasn't passed
  const fallbackId = `popover-${useId()}`;
  const popoverId = id || fallbackId;

  const headerId = `${popoverId}-header`;
  const bodyId = `${popoverId}-body`;

  const prevIsOpen = usePrevious(_isOpen);

  useEffect(() => {
    if (_isOpen && trigger === "click") {
      requestAnimationFrame(() => {
        if (initialFocusRef && initialFocusRef.current) {
          initialFocusRef.current.focus();
        } else {
          if (popoverRef.current) {
            popoverRef.current.focus();
          }
        }
      });
    }

    if (!_isOpen && prevIsOpen && trigger === "click" && returnFocusOnClose) {
      if (referenceRef.current) {
        referenceRef.current.focus();
      }
    }
  }, [
    _isOpen,
    popoverRef,
    initialFocusRef,
    trigger,
    referenceRef,
    prevIsOpen,
    returnFocusOnClose,
  ]);

  const context = {
    popoverRef,
    placement,
    referenceRef,
    headerId,
    bodyId,
    popoverId,
    hasHeadingRef,
    hasBodyRef,
    onOpen,
    onClose,
    onToggle,
    trigger,
    isOpen: _isOpen,
    onBlur: handleBlur,
    closeOnEsc,
    initialFocusRef,
    isHoveringRef,
    usePortal,
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
export {
  usePopoverContext,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
};
export * from "./components";
