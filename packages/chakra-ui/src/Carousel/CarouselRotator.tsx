import React, { useContext, useEffect } from "react";
import { useInterval } from "web-api-hooks";
import useCarouselControls from "./useCarouselControls";
import CarouselContext from "./CarouselContext";
import CarouselSlide from "./CarouselSlide";
import ScrollSnapContainer, {
  ScrollSnapContainerProps,
} from "./ScrollSnapContainer";

// TODO: Follow the status of element scrolling methods and remove polyfill
import "scroll-behavior-polyfill";

// TODO: https://www.w3.org/TR/wai-aria-practices-1.1/#tabbed-carousel-elements

export interface CarouselRotatorProps extends ScrollSnapContainerProps {
  children?: React.ReactElement | React.ReactElement[];
  playInterval?: number;
  shownIndex?: number;
}

export default function CarouselRotator({
  children = [],
  playInterval = 5000,
  shownIndex: controlledShownIndex,
  ...restProps
}: CarouselRotatorProps) {
  const [
    isHovered,
    isFocused,
    [disableAutoPause],
    [uncontrolledShownIndex, setUncontrolledShownIndex],
    [totalCount, setTotalCount],
  ] = useContext(CarouselContext);
  const { isPlaying, setShownIndex } = useCarouselControls();
  const shownIndex =
    controlledShownIndex != null
      ? controlledShownIndex
      : uncontrolledShownIndex;

  // Keep amount of slides updated
  useEffect(() => {
    const nextTotalCount = React.Children.count(children);
    setTotalCount(nextTotalCount);
  }, [children, setTotalCount]);

  // Auto-rotate slides if desired
  useInterval(
    () => {
      setShownIndex(prevIndex => (prevIndex + 1) % totalCount);
    },
    isPlaying && ((!isHovered && !isFocused) || disableAutoPause)
      ? playInterval
      : null,
  );

  return (
    <ScrollSnapContainer
      shownIndex={shownIndex}
      aria-atomic={false}
      aria-live={isPlaying ? "off" : "polite"}
      onMouseDown={e => {
        // Disable mouse wheel scrolling between slides
        if (e.button === 1) e.preventDefault();
      }}
      overflow={
        // Disable user-initiated scrolling when the component is controlled
        controlledShownIndex != null ? "hidden" : "auto"
      }
      onProposedIndexChange={setUncontrolledShownIndex}
      {...restProps}
    >
      {React.Children.map(children, (child, i) => (
        // Labels are lifted up to comply with WAI-ARIA Authoring Practices
        <CarouselSlide
          inert={i !== shownIndex ? "" : undefined}
          aria-label={child.props["aria-label"]}
          aria-labelledby={child.props["aria-labelledby"]}
        >
          {React.cloneElement(child, {
            "aria-label": undefined,
            "aria-labelledby": undefined,
          })}
        </CarouselSlide>
      ))}
    </ScrollSnapContainer>
  );
}
