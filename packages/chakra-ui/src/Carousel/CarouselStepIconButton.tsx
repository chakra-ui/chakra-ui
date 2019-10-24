import React, { useCallback } from 'react';
import useCarouselControls from './useCarouselControls';
import CarouselIconButton, {
  CarouselIconButtonProps,
} from './CarouselIconButton';

export interface CarouselStepIconButtonProps extends CarouselIconButtonProps {
  delta: number;
}

export default function CarouselStepIconButton({
  delta,
  ...restProps
}: CarouselStepIconButtonProps) {
  const { isInfinite, activeIndex, totalCount, jump } = useCarouselControls();
  const nextIndex = activeIndex + delta;

  return (
    <CarouselIconButton
      isDisabled={!isInfinite && (nextIndex < 0 || nextIndex >= totalCount)}
      onClick={useCallback(() => {
        jump(delta);
      }, [delta, jump])}
      {...restProps}
    />
  );
}
