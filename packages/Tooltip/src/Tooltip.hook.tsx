// Credit goes to the amazing Atlaskit team for this
// https://bitbucket.org/atlassian/atlaskit-mk-2/src/master/packages/core/tooltip/src/components/Tooltip.tsx

import * as React from "react";
import flushable from "flushable";
import { useUpdateEffect, useEventListener } from "@chakra-ui/hooks";

let pendingHide: flushable.FlushableOperation;

function show(fn: (isHidePending: boolean) => void, delay: number) {
  const isHidePending = pendingHide?.pending();
  if (isHidePending) {
    pendingHide.flush();
  }
  const pendingShow = flushable(
    () => fn(isHidePending),
    isHidePending ? 0 : delay,
  );
  return pendingShow.cancel;
}

const hide = (fn: (flushed: boolean) => void, delay: number) => {
  pendingHide = flushable(flushed => fn(flushed), delay);
  return pendingHide.cancel;
};

export interface TooltipOptions {
  delay?: number;
  hideOnClick?: boolean;
  hideOnMouseDown?: boolean;
  onShow?: () => void;
  onHide?: () => void;
}

export function useTooltip(props: TooltipOptions) {
  const {
    delay = 300,
    hideOnClick = true,
    onShow,
    onHide,
    hideOnMouseDown,
  } = props;
  // These two states are useful for animations
  const [immediatelyHide, setImmediatelyHide] = React.useState(false);
  const [immediatelyShow, setImmediatelyShow] = React.useState(false);

  const ref = React.useRef<any>(null);

  // The actual visible state of the tooltip
  const [isOpen, setIsOpen] = React.useState(false);

  const cancelPendingRef = React.useRef(() => {});

  React.useEffect(() => {
    return () => {
      cancelPendingRef.current();
    };
  });

  useUpdateEffect(() => {
    if (isOpen) {
      onShow && onShow();
    } else {
      onHide && onHide();
    }
  }, [onShow, onHide]);

  const onScroll = () => {
    if (isOpen) {
      cancelPendingRef.current();
      setIsOpen(false);
      setImmediatelyHide(true);
    }
  };

  useEventListener("scroll", onScroll, document, {
    capture: true,
    passive: true,
  });

  const onClick = () => {
    if (hideOnClick) {
      console.log("clicked");
      cancelPendingRef.current();
      setIsOpen(false);
      setImmediatelyHide(true);
    }
  };

  const onMouseDown = () => {
    if (hideOnMouseDown) {
      cancelPendingRef.current();
      setIsOpen(false);
      setImmediatelyHide(true);
    }
  };

  const showTooltip = () => {
    cancelPendingRef.current();

    if (!isOpen) {
      cancelPendingRef.current = show(immediatelyShow => {
        setIsOpen(true);
        setImmediatelyShow(immediatelyShow);
      }, delay || 0);
    }
  };

  const hideTooltip = () => {
    cancelPendingRef.current();

    if (isOpen) {
      cancelPendingRef.current = hide(immediatelyHide => {
        setIsOpen(false);
        setImmediatelyHide(immediatelyHide);
      }, delay || 0);
    }
  };

  const onMouseOver = (event: React.MouseEvent) => {
    if (isOpen && event.target === (ref.current as HTMLElement)) {
      return;
    }
    showTooltip();
  };

  return {
    isOpen,
    setIsOpen,
    immediatelyHide,
    immediatelyShow,
    bind: {
      ref,
      onMouseOut: hideTooltip,
      onMouseOver,
      onClick,
      onMouseDown,
      onFocus: showTooltip,
      onBlur: hideTooltip,
    },
  };
}

export default useTooltip;
