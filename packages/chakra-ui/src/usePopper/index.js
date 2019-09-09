import { useEffect, useState, useRef, useLayoutEffect } from "react";
import Popper from "popper.js";

const usePopper = ({
  placement = "bottom",
  flip = true,
  shift = true,
  gutter,
  preventOverflow = true,
  eventsEnabled = true,
  boundariesElement = "viewport",
  positionFixed = false,
  isOpen,
}) => {
  const referenceRef = useRef();
  const popoverRef = useRef();
  const arrowRef = useRef();
  const popperRef = useRef();

  const [popoverStyles, setPopoverStyles] = useState({});
  const [arrowStyles, setArrowStyles] = useState({});
  const [realPlacement, setRealPlacement] = useState(placement);

  useLayoutEffect(() => {
    if (!referenceRef.current || !popoverRef.current) return;

    popperRef.current = new Popper(referenceRef.current, popoverRef.current, {
      placement: realPlacement,
      eventsEnabled,
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
    });

    return () => {
      if (popperRef.current) {
        popperRef.current.destroy();
      }
    };
  }, [
    isOpen,
    realPlacement,
    flip,
    shift,
    gutter,
    preventOverflow,
    boundariesElement,
    positionFixed,
    eventsEnabled,
  ]);

  useEffect(() => {
    if (popperRef.current) {
      popperRef.current.enableEventListeners();
      popperRef.current.scheduleUpdate();
    }
    return () => {
      if (popperRef.current) {
        popperRef.current.disableEventListeners();
      }
    };
  }, [isOpen]);

  return {
    popperRef,
    referenceRef,
    popoverRef,
    popoverStyles,
    placement: realPlacement,
    arrowRef,
    arrowStyles,
  };
};

export default usePopper;
