import { css } from "@emotion/core";
import Popper from "popper.js";
import React from "react";
import { useDeepCompareEffect } from "use-deep-compare";
import useCallbackRef from "../useCallbackRef";
import {
  getArrowStyles,
  getNormalizedOffset,
  getPopoverOffset,
} from "./usePopper.utils";

const popperStyles: React.CSSProperties = {
  position: "absolute",
  top: "0",
  left: "0",
  opacity: "0",
  pointerEvents: "none",
};

function usePopperStyle(
  placement: Popper.Placement,
  arrowSize: number,
  popperOffset?: number,
) {
  const [currentPopperStyles, setPopperStyles] = React.useState<
    React.CSSProperties
  >(popperStyles);
  const [currentArrowStyles, setArrowStyles] = React.useState<
    React.CSSProperties
  >({});
  const [currentPlacement, setPlacement] = React.useState<Popper.Placement>(
    placement,
  );

  const setState = React.useCallback(
    (data: Popper.Data) => {
      const arrowStyles = getArrowStyles(
        arrowSize,
        getNormalizedOffset(data.arrowStyles as any),
        data.placement,
      );

      const [dir, offset] = getPopoverOffset(data.placement, {
        arrowSize,
        margin: popperOffset,
        showArrow: !!data.offsets.arrow,
      });

      const popperStyles = {
        ...data.styles,
        [dir]: data.styles[dir] + offset,
      };

      setPopperStyles(popperStyles as React.CSSProperties);
      setArrowStyles(arrowStyles as React.CSSProperties);
      setPlacement(data.placement);

      return data;
    },
    [arrowSize, popperOffset],
  );

  const state = {
    placement: currentPlacement,
    popperStyles: currentPopperStyles,
    arrowStyles: currentArrowStyles,
  };

  return [state, setState] as const;
}

//////////////////////////////////////////////////////////////////////////

export interface PopperOptions {
  placement?: Popper.Placement;
  positionFixed?: boolean;
  eventsEnabled?: boolean;
  modifiers?: Popper.Modifiers;
  shouldUpdate?: boolean;
  arrowSize?: number;
  popperOffset?: number;
}

export function usePopper<
  Reference = HTMLButtonElement,
  Popover = HTMLDivElement,
  Arrow = HTMLDivElement
>({
  placement = "bottom",
  positionFixed = false,
  eventsEnabled = true,
  modifiers = {},
  shouldUpdate,
  arrowSize = 8,
  popperOffset = 0,
}: PopperOptions) {
  const popperInstance = React.useRef<Popper>(null);
  const [popperStyles, updatePopperState] = usePopperStyle(
    placement,
    arrowSize,
    popperOffset,
  );
  const [referenceNode, referenceRef] = useCallbackRef<Reference>();
  const [popperNode, popperRef] = useCallbackRef<Popover>();
  const [arrowNode, arrowRef] = useCallbackRef<Arrow>();

  React.useLayoutEffect(() => {
    if (shouldUpdate && popperInstance.current) {
      popperInstance.current.scheduleUpdate();
    }
  }, [popperInstance, shouldUpdate]);

  useDeepCompareEffect(() => {
    if (popperInstance.current !== null) {
      popperInstance.current.destroy();
    }

    if (referenceNode === null || popperNode === null) return;

    // @ts-ignore
    popperInstance.current = new Popper(referenceNode, popperNode, {
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
        computeStyle: {
          gpuAcceleration: false,
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
    placement: popperStyles.placement,
    popperInstance: popperInstance.current,
    reference: {
      ref: referenceRef,
    },
    popper: {
      ref: popperRef,
      style: popperStyles.popperStyles as React.CSSProperties,
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

export type PopperJS = Popper;
