// Credit: https://github.com/maktouch/use-popper
import PopperJS from "popper.js";
import React from "react";
import { css } from "@emotion/core";
import { useDeepCompareEffect } from "use-deep-compare";
import useCallbackRef from "../useCallbackRef";

const popperStyles: React.CSSProperties = {
  position: "absolute",
  top: "0",
  left: "0",
  opacity: "0",
  pointerEvents: "none",
};

function usePopperState(
  placement: PopperJS.Placement,
): [
  {
    placement: PopperJS.Placement;
    popperStyles: React.CSSProperties;
    arrowStyles?: React.CSSProperties | {};
  },
  (data: PopperJS.Data) => PopperJS.Data,
] {
  const [currentPopperStyles, setPopperStyles] = React.useState<
    React.CSSProperties
  >(popperStyles);
  const [currentArrowStyles, setArrowStyles] = React.useState<
    React.CSSProperties
  >({});
  const [currentPlacement, setPlacement] = React.useState<PopperJS.Placement>(
    placement,
  );

  const setState = React.useCallback((data: PopperJS.Data) => {
    const { styles, arrowStyles, placement: p } = data;

    setPopperStyles(styles as React.CSSProperties);
    setArrowStyles(arrowStyles as React.CSSProperties);
    setPlacement(p);

    return data;
  }, []);

  const state = {
    placement: currentPlacement,
    popperStyles: currentPopperStyles,
    arrowStyles: currentArrowStyles,
  };

  return [state, setState];
}

//////////////////////////////////////////////////////////////////////////

export interface UsePopperOptions {
  placement?: PopperJS.Placement;
  positionFixed?: boolean;
  eventsEnabled?: boolean;
  modifiers?: PopperJS.Modifiers;
}

function usePopper<R = HTMLElement, P = HTMLElement, A = HTMLElement>({
  placement = "bottom",
  positionFixed = false,
  eventsEnabled = true,
  modifiers = {},
}: UsePopperOptions) {
  const popperInstance = React.useRef<PopperJS>(null);
  const [popperStyles, updatePopperState] = usePopperState(placement);
  const [referenceNode, referenceRef] = useCallbackRef<R>();
  const [popperNode, popperRef] = useCallbackRef<P>();
  const [arrowNode, arrowRef] = useCallbackRef<A>();

  useDeepCompareEffect(() => {
    if (popperInstance.current !== null) {
      popperInstance.current.destroy();
    }

    if (referenceNode === null || popperNode === null) return;

    // @ts-ignore
    popperInstance.current = new PopperJS(referenceNode, popperNode, {
      placement,
      positionFixed,
      modifiers: {
        ...modifiers,
        arrow: {
          ...(modifiers && modifiers.arrow),
          enabled: Boolean(arrowNode),
          element: arrowNode,
        },
        applyStyle: { enabled: false },
        updateStateModifier: {
          enabled: true,
          order: 900,
          fn: updatePopperState,
        },
      },
    });

    return () => {
      if (popperInstance.current !== null) {
        popperInstance.current.destroy();
      }
    };
  }, [
    popperInstance,
    arrowNode,
    referenceNode,
    popperNode,
    placement,
    positionFixed,
    modifiers,
  ]);

  React.useEffect(() => {
    if (popperInstance.current === null) return;

    if (eventsEnabled) {
      popperInstance.current.enableEventListeners();
    } else {
      popperInstance.current.disableEventListeners();
    }
  }, [popperInstance, eventsEnabled]);

  React.useEffect(() => {
    if (popperInstance.current !== null) {
      popperInstance.current.scheduleUpdate();
    }
  }, [popperInstance]);

  return {
    popperInstance: popperInstance.current,
    reference: {
      ref: referenceRef,
    },
    popper: {
      ref: popperRef,
      style: popperStyles.popperStyles as React.CSSProperties,
      placement: popperStyles.placement,
    },
    arrow: {
      ref: arrowRef,
      style: popperStyles.arrowStyles as React.CSSProperties,
    },
  };
}

export default usePopper;

////////////////////////////////////////////////

export function computeArrowStyle(options: {
  size: React.CSSProperties["width"];
  shadowColor: React.CSSProperties["color"];
  hasArrow: boolean;
}) {
  const { size, shadowColor, hasArrow } = options;
  const margin = hasArrow ? `calc(${size} / 2)` : null;
  const arrowPosition = `calc(${size} / 2 * -1)`;

  return css`
    [data-arrow] {
      width: ${size};
      height: ${size};
      position: absolute;
      transform: rotate(45deg);

      &::before {
        content: "";
        width: ${size};
        height: ${size};
        position: absolute;
        z-index: -1;
      }
    }

    &[data-placement^="top"] {
      margin-bottom: ${margin};
      transform-origin: bottom center;
    }

    &[data-placement^="top"] [data-arrow] {
      bottom: ${arrowPosition};

      &::before {
        box-shadow: 2px 2px 2px 0 ${shadowColor};
      }
    }

    &[data-placement^="bottom"] {
      margin-top: ${margin};
      transform-origin: top center;
    }

    &[data-placement^="bottom"] [data-arrow] {
      top: ${arrowPosition};

      &::before {
        box-shadow: -1px -1px 1px 0 ${shadowColor};
      }
    }

    &[data-placement^="right"] {
      margin-left: ${margin};
      transform-origin: left center;
    }

    &[data-placement^="right"] [data-arrow] {
      left: ${arrowPosition};

      &::before {
        box-shadow: -1px 1px 1px 0 ${shadowColor};
      }
    }

    &[data-placement^="left"] {
      margin-right: ${margin};
      transform-origin: right center;
    }

    &[data-placement^="left"] [data-arrow] {
      right: ${arrowPosition};
      &::before {
        box-shadow: 1px -1px 1px 0 ${shadowColor};
      }
    }
  `;
}

export type PopperJS = PopperJS;
