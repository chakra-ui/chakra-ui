import { Flex, FlexProps } from "../Flex";
import { css } from "@emotion/core";
import ResizeObserverPolyfill from "@juggle/resize-observer";
import React, { useRef, useState, useEffect } from "react";
import { useChanging } from "state-hooks";
import { usePreferredMotionIntensity, useSize } from "web-api-hooks";
import { useEnhancedEffect as useLayoutEffect } from "../utils";

export interface ScrollSnapContainerProps extends FlexProps {
  shownIndex?: number;
  onProposedIndexChange?: (index: number) => void;
}

export default function ScrollSnapContainer({
  shownIndex = 0,
  children,
  onProposedIndexChange,
  ...restProps
}: ScrollSnapContainerProps) {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const ref = useRef<HTMLElement>(null);

  // TODO: Replace with https://github.com/w3c/csswg-drafts/issues/1562
  const willScroll = useRef(false);

  // TODO: Replace this check with CSS when no polyfill is required
  const preferReducedMotion = usePreferredMotionIntensity() === "reduce";

  // Handle prop changes
  useLayoutEffect(() => {
    const shownChild = ref.current!.children[shownIndex] as HTMLElement;
    willScroll.current = true;
    ref.current!.scroll({
      left: shownChild.offsetLeft,
      ...(!preferReducedMotion && { behavior: "smooth" }),
    });
  }, [preferReducedMotion, shownIndex]);

  // Re-snap scroll position when content of the snapport changes
  // TODO: Remove when browsers handle this natively
  const [width] = useSize(
    ref,
    (typeof window !== "undefined" ? window.ResizeObserver : undefined) ||
      ((ResizeObserverPolyfill as unknown) as typeof ResizeObserver),
  );
  // Handle resize events firing prior to layout
  // See: https://openradar.appspot.com/radar?id=5040881597939712
  const isWidthChanging = useChanging(width);
  useLayoutEffect(() => {
    const shownChild = ref.current!.children[shownIndex] as HTMLElement;
    ref.current!.scrollLeft = shownChild.offsetLeft;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWidthChanging, width]);

  // Handle scrolling
  const [scrollLeft, setScrollLeft] = useState(0);
  const isScrollLeftChanging = useChanging(scrollLeft);
  useEffect(() => {
    if (isScrollLeftChanging) {
      willScroll.current = false;
    } else if (
      onProposedIndexChange &&
      !isWidthChanging &&
      !willScroll.current
    ) {
      const proposedIndex = Math.round(
        (scrollLeft / ref.current!.scrollWidth) *
          React.Children.count(children),
      );
      if (proposedIndex !== shownIndex) {
        onProposedIndexChange(proposedIndex);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isScrollLeftChanging,
    isWidthChanging,
    onProposedIndexChange,
    scrollLeft,
  ]);

  return (
    <Flex
      ref={ref}
      css={css`
        /* Support every version of CSS Scroll Snap */
        scroll-snap-type-x: mandatory;
        -ms-scroll-snap-type: mandatory;
        scroll-snap-type: x mandatory;
        -ms-scroll-snap-points-x: snapInterval(0, 100%);
        scroll-snap-points-x: repeat(100%);
        -webkit-overflow-scrolling: touch;

        /* Optimize scrolling behavior */
        will-change: scroll-position;

        /* TODO: Leave vendor prefixing to the underlying library */
        ::-webkit-scrollbar {
          display: none;
        }
        -ms-overflow-style: none;
        scrollbar-width: none;
      `}
      onScroll={() => {
        setScrollLeft(ref.current!.scrollLeft);
      }}
      {...restProps}
    >
      {children}
    </Flex>
  );
}
