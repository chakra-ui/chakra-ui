import {
  useCallback,
  useRef,
  MouseEventHandler,
  KeyboardEventHandler,
} from "react";
import useFocusEffect from "./useFocusEffect";

interface Props<T> {
  isDisabled?: boolean;
  onMouseOver?: MouseEventHandler<T | HTMLElement>;
  isFocusable?: boolean;
  onClick?: MouseEventHandler<T | HTMLElement>;
  onKeyUp?: KeyboardEventHandler<T | HTMLElement>;
  onKeyDown?: KeyboardEventHandler<T | HTMLElement>;
}

function useButton<T>(props: Props<T>) {
  const {
    isDisabled,
    onMouseOver,
    isFocusable,
    onClick,
    onKeyUp,
    onKeyDown,
  } = props;
  const _isDisabled = isDisabled && !isFocusable;

  const ref = useRef<HTMLElement>(null);
  const isFocused = document.activeElement === ref.current;

  useFocusEffect(isFocused, ref);

  const _onMouseOver = useCallback(
    event => {
      if (isDisabled) {
        event.stopPropagation();
        event.preventDefault();
      } else if (onMouseOver) {
        onMouseOver(event);
      }
    },
    [isDisabled, onMouseOver],
  );

  const _onClick = useCallback(
    event => {
      if (isDisabled) {
        event.stopPropagation();
        event.preventDefault();
      } else if (onClick) {
        onClick(event);
      }
    },
    [isDisabled, onClick],
  );

  const _onKeyDown = useCallback(
    event => {
      if (isDisabled) return;
      if (event.key === " ") {
        event.preventDefault();
      }
      if (event.key === "Enter") {
        event.preventDefault();
        event.target.dispatchEvent(
          new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: false,
          }),
        );
      }
      if (onKeyDown) {
        onKeyDown(event);
      }
    },
    [isDisabled, onKeyDown],
  );

  const _onKeyUp = useCallback(
    event => {
      if (isDisabled) return;
      if (event.key === " ") {
        event.preventDefault();
        event.target.dispatchEvent(
          new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: false,
          }),
        );
      }
      if (onKeyUp) {
        onKeyUp(event);
      }
    },
    [isDisabled, onKeyUp],
  );

  return {
    ref,
    role: "button",
    "aria-disabled": isDisabled,
    tabIndex: _isDisabled ? undefined : 0,
    onClick: _onClick,
    onKeyUp: _onKeyUp,
    onMouseOver: _onMouseOver,
    onKeyDown: _onKeyDown,
  };
}

export default useButton;
