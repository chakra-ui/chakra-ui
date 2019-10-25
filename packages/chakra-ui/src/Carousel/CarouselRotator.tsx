import { Flex, FlexProps, usePrevious } from "@chakra-ui/core";
import { css } from "@emotion/core";
import React, { useCallback, useContext, useEffect } from "react";
import { useInterval } from "web-api-hooks";
import useCarouselControls from "./useCarouselControls";
import useResizeObserver from "./useResizeObserver";
import CarouselContext from "./CarouselContext";
import CarouselSlide from "./CarouselSlide";

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
  ...restProps
}: CarouselRotatorProps) {
  const [
    isHovered,
    isFocused,
    [disableAutoPause],
    [uncontrolledActiveIndex, setUncontrolledActiveIndex],
    [totalCount, setTotalCount],
    slidesRef,
  ] = useContext(CarouselContext);
  const { isPlaying, jump } = useCarouselControls();
  const activeIndex =
    controlledActiveIndex != null
      ? controlledActiveIndex
      : uncontrolledActiveIndex;

  // Keep amount of slides updated
  useEffect(() => {
    const nextTotalCount = React.Children.count(children);
    setTotalCount(nextTotalCount);
    slidesRef.current.splice(nextTotalCount);
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
  const [rotatorRef, [width]] = useResizeObserver();
  const prevWidth = usePrevious(width);
  useEffect(() => {
    if (width !== prevWidth) {
      const slide = slidesRef.current[activeIndex];
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      rotatorRef.current!.scrollLeft = slide.offsetLeft;
    }
  }, [activeIndex, prevWidth, rotatorRef, slidesRef, width]);

  return (
    <Flex
      ref={rotatorRef}
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
        -webkit-overflow-scrolling: touch;

        /* TODO: Leave vendor prefixing to the underlying library */
        ::-webkit-scrollbar {
          display: none;
        }
        -ms-overflow-style: none;
        scrollbar-width: none;
      `}
      onScroll={useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const { scrollLeft, scrollWidth } = rotatorRef.current!;
        setUncontrolledActiveIndex(
          Math.round(totalCount * (scrollLeft / scrollWidth)),
        );
      }, [rotatorRef, setUncontrolledActiveIndex, totalCount])}
      {...restProps}
    >
      {React.Children.map(children, (child, i) => (
        // Labels are lifted up to comply with WAI-ARIA Authoring Practices
        <CarouselSlide
          ref={(element: HTMLElement) => {
            slidesRef.current[i] = element;
          }}
          inert={i !== activeIndex ? "" : undefined}
          aria-label={child.props["aria-label"]}
          aria-labelledby={child.props["aria-labelledby"]}
        >
          {React.cloneElement(child, {
            "aria-label": undefined,
            "aria-labelledby": undefined,
          })}
        </CarouselSlide>
      ))}
    </Flex>
  );
}
