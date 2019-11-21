import { normalizeEventKey } from "@chakra-ui/utils";
import { KeyboardEventHandler, MouseEventHandler, useCallback } from "react";

export interface UseTabbableOptions<T = any> {
  isDisabled?: boolean;
  onMouseOver?: MouseEventHandler<T>;
  onMouseDown?: MouseEventHandler<T>;
  isFocusable?: boolean;
  onClick?: MouseEventHandler<T>;
  onKeyUp?: KeyboardEventHandler<T>;
  onKeyDown?: KeyboardEventHandler<T>;
  clickOnEnter?: boolean;
  clickOnSpace?: boolean;
  tabIndex?: number;
}

function useTabbable<T extends HTMLElement>(props: UseTabbableOptions<T>) {
  const trulyDisabled = props.isDisabled && !props.isFocusable;

  const onMouseDown = useCallback(
    event => {
      if (props.isDisabled) {
        event.stopPropagation();
        event.preventDefault();
      } else {
        if (document.activeElement === document.body) {
          event.target.focus();
        }

        if (props.onMouseDown) {
          props.onMouseDown(event);
        }
      }
    },
    [props.isDisabled, props.onMouseDown],
  );

  const onClick = useCallback(
    event => {
      if (props.isDisabled) {
        event.stopPropagation();
        event.preventDefault();
      } else if (props.onClick) {
        if (props.onClick) {
          props.onClick(event);
        }
      }
    },
    [props.isDisabled, props.onClick],
  );

  const onKeyDown = useCallback(
    event => {
      const eventKey = normalizeEventKey(event);
      const shouldEnterClick = props.clickOnEnter && eventKey === "Enter";
      const shouldSpaceClick = props.clickOnSpace && eventKey === " ";

      if (props.isDisabled) return;

      if (shouldEnterClick || shouldSpaceClick) {
        event.preventDefault();
        event.target.dispatchEvent(
          new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: false,
          }),
        );
      }

      if (props.onKeyDown) {
        props.onKeyDown(event);
      }
    },
    [props.isDisabled, props.onKeyDown, props.clickOnEnter, props.clickOnSpace],
  );

  return {
    ...props,
    role: "button",
    disabled: trulyDisabled,
    "aria-disabled": props.isDisabled,
    tabIndex: trulyDisabled ? undefined : props.tabIndex,
    onClick,
    onMouseDown,
    onKeyDown,
  };
}

export default useTabbable;
