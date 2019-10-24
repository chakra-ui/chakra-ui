import { Flex, FlexProps } from "@chakra-ui/core";
import { css } from "@emotion/core";
import React, { useCallback, useContext, useEffect } from "react";
import { InView } from "react-intersection-observer";
import {
  useInterval,
  usePreferredMotionIntensity,
  useWindowSize,
} from "web-api-hooks";
import useCarouselControls from "./useCarouselControls";
import useWindowResizing from "./useWindowResizing";
import CarouselContext from "./CarouselContext";
import CarouselSlide from "./CarouselSlide";

// TODO: Follow browser support for IntersectionObserver and remove polyfill
import "intersection-observer";

// TODO: Follow the status of element scrolling methods and remove polyfill
import "scroll-behavior-polyfill";

// TODO: https://www.w3.org/TR/wai-aria-practices-1.1/#tabbed-carousel-elements

export interface CarouselRotatorProps extends FlexProps {
  children: React.ReactElement[];
  playInterval?: number;
  activeIndex?: number;
}

export default function CarouselRotator({
  children,
  playInterval = 5000,
  activeIndex: controlledActiveIndex,
  style,
  ...restProps
}: CarouselRotatorProps) {
  const [
    isHovered,
    isFocused,
    [disableAutoPause],
    [uncontrolledActiveIndex, setUncontrolledActiveIndex],
    [, setTotalCount],
    slidesRef,
  ] = useContext(CarouselContext);
  const { isPlaying, jump } = useCarouselControls();
  const activeIndex =
    controlledActiveIndex != null
      ? controlledActiveIndex
      : uncontrolledActiveIndex;

  // Keep amount of slides updated
  useEffect(() => {
    const totalCount = React.Children.count(children);
    setTotalCount(totalCount);
    slidesRef.current.splice(totalCount);
  }, [children, setTotalCount, slidesRef]);

  // Auto-rotate slides if desired
  useInterval(
    () => {
      jump(+1);
    },
    isPlaying && ((!isHovered && !isFocused) || disableAutoPause)
      ? playInterval
      : null,
  );

  // Re-snap scroll position when content of the snapport changes
  // TODO: Remove when browsers handle this natively
  const [windowWidth] = useWindowSize();
  const isWindowResizing = useWindowResizing();
  useEffect(() => {
    if (isWindowResizing) {
      const slide = slidesRef.current[activeIndex];
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      slide.parentElement!.scrollLeft = slide.offsetLeft;
    }
  }, [activeIndex, isWindowResizing, slidesRef, windowWidth]);

  // TODO: Replace this check with CSS when no polyfill is required
  const preferReducedMotion = usePreferredMotionIntensity() === "reduce";

  return (
    <Flex
      aria-atomic={false}
      aria-live={isPlaying ? "off" : "polite"}
      onMouseDown={useCallback(e => {
        // Disable mouse wheel scrolling between slides
        if (e.button === 1) e.preventDefault();
      }, [])}
      position="relative"
      overflow={
        // Disable user-initiated scrolling when the component is controlled
        controlledActiveIndex != null ? "hidden" : "auto"
      }
      css={css`
        /* Support every version of CSS Scroll Snap */
        scroll-snap-type-x: mandatory;
        -ms-scroll-snap-type: mandatory;
        scroll-snap-type: x mandatory;
        -ms-scroll-snap-points-x: snapInterval(0, 100%);
        scroll-snap-points-x: repeat(100%);
        scroll-snap-stop: always;
        -webkit-overflow-scrolling: touch;

        /* TODO: Leave vendor prefixing to the underlying library */
        ::-webkit-scrollbar {
          display: none;
        }
        -ms-overflow-style: none;
        scrollbar-width: none;
      `}
      style={{
        // Smooth scroll polyfill only works with inline styles
        ...(!isWindowResizing &&
          !preferReducedMotion && { scrollBehavior: "smooth" }),
        ...style,
      }}
      {...restProps}
    >
      {React.Children.map(children, (child, i) => (
        <InView
          threshold={0.5}
          onChange={inView => {
            if (inView) setUncontrolledActiveIndex(i);
          }}
        >
          {// eslint-disable-next-line @typescript-eslint/no-unused-vars
          ({ ref }) => {
            return (
              // Labels are lifted up to comply with WAI-ARIA Authoring Practices
              <CarouselSlide
                ref={(element: HTMLElement) => {
                  (ref as (node: Element) => void)(element);
                  slidesRef.current[i] = element;
                }}
                inert={i === activeIndex ? "" : undefined}
                aria-label={child.props["aria-label"]}
                aria-labelledby={child.props["aria-labelledby"]}
              >
                {React.cloneElement(child, {
                  "aria-label": undefined,
                  "aria-labelledby": undefined,
                })}
              </CarouselSlide>
            );
          }}
        </InView>
      ))}
    </Flex>
  );
}
