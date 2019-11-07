import PopperJS from "popper.js";
import React from "react";
import { useDeepCompareEffect } from "use-deep-compare";

///////////////////////////////////////////////////////////////

function useCallbackRef<T>(): [T | null, React.RefObject<T>] {
  const [node, setNode] = React.useState<T | null>(null);

  const ref = React.useCallback<(node: T) => void>(node => {
    if (node !== null) {
      setNode(node);
    }
  }, []);

  return [node, (ref as unknown) as React.RefObject<T>];
}

//////////////////////////////////////////////////////////////////////////

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

export interface Popper {
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
}: Popper) {
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
