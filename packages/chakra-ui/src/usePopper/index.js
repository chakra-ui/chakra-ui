import PopperJS from "popper.js";
import { useRef, useState, useEffect } from "react";
import { useDeepCompareLayoutEffect } from "./utils";

function usePopper({
  placement = "bottom",
  flip = true,
  shift = true,
  gutter,
  positionFixed = false,
  eventsEnabled = true,
  preventOverflow = true,
  boundariesElement = "scrollParent",
  isOpen,
  modifiers = {},
}) {
  const referenceRef = useRef(null);
  const popperRef = useRef(null);
  const arrowRef = useRef(null);
  const popperInstance = useRef(null);

  const [popoverStyles, setPopoverStyles] = useState({});
  const [arrowStyles, setArrowStyles] = useState({});
  const [realPlacement, setRealPlacement] = useState(placement);

  useDeepCompareLayoutEffect(() => {
    if (popperInstance.current !== null) {
      popperInstance.current.destroy();
    }

    if (referenceRef.current === null || popperRef.current === null) return;

    popperInstance.current = new PopperJS(
      referenceRef.current,
      popperRef.current,
      {
        placement: realPlacement,
        eventsEnabled: isOpen,
        positionFixed,
        modifiers: {
          flip: {
            enabled: flip,
            padding: 16,
          },
          shift,
          preventOverflow: { enabled: preventOverflow, boundariesElement },
          arrow: arrowRef.current
            ? { enabled: true, element: arrowRef.current }
            : undefined,
          hide: {
            enabled: false,
          },
          applyStyle: {
            enabled: false,
          },
          offset: { enabled: shift, offset: `0, ${gutter}` },
          updateStateModifier: {
            order: 900,
            enabled: true,
            fn: data => {
              setPopoverStyles(data.styles);
              setRealPlacement(data.placement);
              if (
                data.arrowStyles.left != null &&
                !isNaN(+data.arrowStyles.left) &&
                data.arrowStyles.top != null &&
                !isNaN(+data.arrowStyles.top)
              ) {
                setArrowStyles(data.arrowStyles);
              }

              return data;
            },
          },
        },
      },
    );

    return () => {
      if (popperInstance.current) {
        popperInstance.current.destroy();
      }
    };
  }, [
    isOpen,
    realPlacement,
    flip,
    shift,
    gutter,
    popperInstance,
    preventOverflow,
    boundariesElement,
    positionFixed,
    modifiers,
    eventsEnabled,
    referenceRef.current,
    popperRef.current,
  ]);

  useEffect(() => {
    if (popperInstance.current === null) return;

    if (eventsEnabled) {
      popperInstance.current.enableEventListeners();
    } else {
      popperInstance.current.disableEventListeners();
    }
  }, [popperInstance, eventsEnabled]);

  useEffect(() => {
    if (popperInstance.current !== null) {
      popperInstance.current.scheduleUpdate();
    }
  }, [popperInstance]);

  useEffect(() => {
    if (popperInstance.current) {
      popperInstance.current.scheduleUpdate();
    }
  }, [isOpen]);

  return {
    referenceRef,
    popoverRef: popperRef,
    popoverStyles,
    placement: realPlacement,
    arrowRef,
    arrowStyles,
  };
}

export default usePopper;
