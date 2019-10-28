import * as React from "react";
import { canUseDOM } from "@chakra-ui/utils";

function useLongPress(callback: () => void, speed = 200) {
  const [isPressed, setIsPressed] = React.useState(false);

  React.useEffect(() => {
    let timerId: any;
    if (isPressed) {
      timerId = setTimeout(callback, speed);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isPressed, callback, speed]);

  const start = React.useCallback(() => {
    callback();
    setIsPressed(true);
  }, [callback]);

  const stop = React.useCallback(() => {
    setIsPressed(false);
  }, []);

  const clickEvent =
    canUseDOM && !!document.documentElement.ontouchstart
      ? "onTouchStart"
      : "onMouseDown";

  return {
    [clickEvent]: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchEnd: stop,
  };
}

export default useLongPress;
