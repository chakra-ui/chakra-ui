import { Box, BoxProps } from "../Box";
import React, { useState } from "react";
import { useFocus, useHover } from "web-api-hooks";
import CarouselContext from "./CarouselContext";

export interface CarouselContainerProps extends BoxProps {
  isInfinite?: boolean;
  autoPlay?: boolean;
  initialIndex?: number;
}

export default function CarouselContainer({
  isInfinite = false,
  autoPlay = false,
  initialIndex = 0,
  ...restProps
}: CarouselContainerProps) {
  const [isHovered, bindHover] = useHover();
  const [isFocused, bindFocus] = useFocus();

  return (
    <CarouselContext.Provider
      value={[
        isHovered,
        isFocused,
        useState<boolean>(false),
        useState(initialIndex),
        useState(initialIndex + 1),
        useState(autoPlay),
        isInfinite,
      ]}
    >
      <Box
        as="section"
        aria-roledescription="carousel"
        position="relative"
        {...bindHover}
        {...bindFocus}
        {...restProps}
      />
    </CarouselContext.Provider>
  );
}
