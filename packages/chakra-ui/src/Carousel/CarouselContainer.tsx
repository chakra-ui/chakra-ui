import { Box, BoxProps } from '@chakra-ui/core';
import React, { useRef, useState } from 'react';
import CarouselContext from './CarouselContext';
import useFocus from './useFocus';
import useHover from './useHover';

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
        useRef<HTMLElement[]>([]),
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
