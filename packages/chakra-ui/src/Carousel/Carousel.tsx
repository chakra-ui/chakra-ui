import React from "react";
import CarouselContainer, { CarouselContainerProps } from "./CarouselContainer";
import CarouselOverlay from "./CarouselOverlay";
import CarouselRotator, { CarouselRotatorProps } from "./CarouselRotator";

export interface CarouselProps
  extends CarouselRotatorProps,
    Omit<CarouselContainerProps, "children"> {}

export default function Carousel({
  children,
  playInterval,
  shownIndex,
  ...restProps
}: CarouselProps) {
  return (
    <CarouselContainer {...restProps}>
      <CarouselOverlay />
      <CarouselRotator playInterval={playInterval} shownIndex={shownIndex}>
        {children}
      </CarouselRotator>
    </CarouselContainer>
  );
}
