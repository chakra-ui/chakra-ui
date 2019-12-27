import * as React from "react";
import useMergeRefs from "../useMergeRefs";

type HTMLAttributes = React.HTMLAttributes<Element> &
  React.RefAttributes<Element>;

type HTMLProps = Pick<
  HTMLAttributes,
  | "onMouseOver"
  | "onMouseDown"
  | "onMouseUp"
  | "onClick"
  | "onKeyDown"
  | "onKeyUp"
  | "ref"
  | "tabIndex"
>;

export interface TabbableProps extends HTMLProps {
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
}

function useTabbable({
  isDisabled,
  isFocusable,
  clickOnEnter = true,
  clickOnSpace = true,
  onMouseDown,
  onMouseUp,
  onClick,
  onKeyDown,
  onKeyUp,
  tabIndex: tabIndexProp,
  onMouseOver,
  ...props
}: TabbableProps) {
  // We'll use this to track if the element is a button element
  const [isButton, setIsButton] = React.useState(true);

  // For custom button implementation, we'll use this to track when
  // we mouse down on the button, to enable use style it's ":active" style
  const [isPressed, setIsPressed] = React.useState(false);

  // The ref callback that fires as soon as the dom node is ready
  const refCallback = React.useCallback(node => {
    if (node && node.tagName !== "BUTTON") {
      setIsButton(false);
    }
  }, []);

  const tabIndex = isButton ? tabIndexProp : tabIndexProp || 0;
  const trulyDisabled = isDisabled && !isFocusable;

  const handleClick = React.useCallback(
    (event: React.MouseEvent) => {
      if (isDisabled) {
        event.stopPropagation();
        event.preventDefault();
        return;
      }

      (event.currentTarget as HTMLElement).focus();

      if (onClick) {
        onClick(event);
      }
    },
    [isDisabled, onClick],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (onKeyDown) {
        onKeyDown(event);
      }

      if (isDisabled) return;

      const shouldEnterClick = clickOnEnter && event.key === "Enter";

      if (!isButton && event.key === " ") {
        event.preventDefault();
        setIsPressed(true);
        return;
      }

      if (!isButton && shouldEnterClick) {
        event.preventDefault();
        (event.currentTarget as HTMLElement).click();
        return;
      }
    },
    [isDisabled, isButton, onKeyDown, clickOnEnter],
  );

  const handleKeyUp = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (onKeyUp) {
        onKeyUp(event);
      }

      if (isDisabled) return;
      const shouldSpaceClick = clickOnSpace && event.key === " ";

      if (!isButton && shouldSpaceClick) {
        event.preventDefault();
        setIsPressed(false);
        (event.currentTarget as HTMLElement).click();
      }
    },
    [clickOnSpace, isButton, isDisabled, onKeyUp],
  );

  const handleMouseDown = React.useCallback(
    (event: React.MouseEvent) => {
      if (isDisabled) {
        event.stopPropagation();
        event.preventDefault();
        return;
      }

      if (!isButton) {
        setIsPressed(true);
      }

      if (onMouseDown) {
        onMouseDown(event);
      }
    },
    [isDisabled, isButton, onMouseDown],
  );

  const handleMouseUp = React.useCallback(
    (event: React.MouseEvent) => {
      if (!isButton) {
        setIsPressed(false);
      }

      if (onMouseUp) {
        onMouseUp(event);
      }
    },
    [onMouseUp, isButton],
  );

  const handleMouseOver = React.useCallback(
    (event: React.MouseEvent) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }

      if (onMouseOver) {
        onMouseOver(event);
      }
    },
    [isDisabled, onMouseOver],
  );

  const ref = useMergeRefs(props.ref, refCallback);

  if (isButton) {
    return {
      ...props,
      ref,
      "aria-disabled": trulyDisabled ? undefined : isDisabled,
      disabled: trulyDisabled,
      onClick: handleClick,
      onMouseDown,
      onMouseUp,
      onKeyUp,
      onKeyDown,
      onMouseOver,
    };
  }

  return {
    ...props,
    ref,
    role: "button",
    "data-active": isPressed || undefined,
    "aria-disabled": isDisabled,
    tabIndex: trulyDisabled ? undefined : tabIndex,
    onClick: handleClick,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onKeyUp: handleKeyUp,
    onKeyDown: handleKeyDown,
    onMouseOver: handleMouseOver,
  };
}

export default useTabbable;
