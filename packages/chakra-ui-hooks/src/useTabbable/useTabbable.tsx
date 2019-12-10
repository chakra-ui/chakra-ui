import { normalizeEventKey, omit } from "@chakra-ui/utils";
import * as React from "react";
import useForkRef from "../useForkRef";

export interface UseTabbableOptions {
  /**
   * If `true`, the element will be disabled.
   * It will set the `disabled` HTML attribute
   */
  isDisabled?: boolean;
  /**
   * If `true` and isDisabled, the element will
   * have only `aria-disabled` set to `true`
   */
  isFocusable?: boolean;
  /**
   * Whether or not trigger click on pressing ```Enter```.
   */
  clickOnEnter?: boolean;
  /**
   * Whether or not trigger click on pressing ```Space```.
   */
  clickOnSpace?: boolean;
  onMouseDown?: React.MouseEventHandler;
  onClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  tabIndex?: number;
  ref?: React.Ref<any>;
}

const defaultProps: Partial<UseTabbableOptions> = {
  clickOnEnter: true,
  clickOnSpace: true,
};

function useTabbable(props: UseTabbableOptions) {
  const {
    isDisabled,
    isFocusable,
    clickOnEnter,
    clickOnSpace,
    onMouseDown: onMouseDownProp,
    onClick: onClickProp,
    onKeyDown: onKeyDownProp,
  } = props;

  const [isButton, setIsButton] = React.useState(true);

  const refCallback = React.useCallback(node => {
    if (node != null && node.tagName !== "BUTTON") {
      setIsButton(false);
    }
  }, []);

  const tabIndex = isButton ? props.tabIndex : props.tabIndex || 0;

  const trulyDisabled = isDisabled && !isFocusable;

  const onMouseDown = React.useCallback(
    event => {
      if (isDisabled) {
        event.stopPropagation();
        event.preventDefault();
      } else {
        if (onMouseDownProp) {
          onMouseDownProp(event);
        }
      }
    },
    [isDisabled, onMouseDownProp],
  );

  const onClick = React.useCallback(
    event => {
      if (isDisabled) {
        event.stopPropagation();
        event.preventDefault();
      } else {
        if (document.activeElement === document.body) {
          event.target.focus();
        }
        event.target.focus();
        if (onClickProp) {
          onClickProp(event);
        }
      }
    },
    [isDisabled, onClickProp],
  );

  const onKeyDown = React.useCallback(
    event => {
      if (onKeyDownProp) {
        onKeyDownProp(event);
      }

      const eventKey = normalizeEventKey(event);
      const shouldEnterClick = clickOnEnter && eventKey === "Enter";
      const shouldSpaceClick = clickOnSpace && eventKey === " ";

      if (isDisabled) return;

      if (!isButton && (shouldEnterClick || shouldSpaceClick)) {
        event.preventDefault();
        event.target.dispatchEvent(
          new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: false,
          }),
        );
      }
    },
    [isDisabled, isButton, onKeyDownProp, clickOnEnter, clickOnSpace],
  );

  const ref = useForkRef(props.ref, refCallback);

  const cleanProps = omit(props, [
    "isDisabled",
    "isFocusable",
    "clickOnEnter",
    "clickOnSpace",
  ]);

  if (isButton) {
    return {
      ...cleanProps,
      ref,
      "aria-disabled": props.isDisabled,
      disabled: trulyDisabled,
      onClick,
      onMouseDown,
    };
  }

  return {
    ...cleanProps,
    ref,
    role: "button",
    "aria-disabled": props.isDisabled,
    tabIndex: trulyDisabled ? undefined : tabIndex,
    onClick,
    onMouseDown,
    onKeyDown,
  };
}

export default useTabbable;
