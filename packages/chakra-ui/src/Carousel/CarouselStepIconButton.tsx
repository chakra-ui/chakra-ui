import React from "react";
import useCarouselControls from "./useCarouselControls";
import CarouselIconButton, {
  CarouselIconButtonProps,
} from "./CarouselIconButton";

export interface CarouselStepIconButtonProps extends CarouselIconButtonProps {
  delta: number;
}

export default function CarouselStepIconButton({
  delta,
  ...restProps
}: CarouselStepIconButtonProps) {
  const {
    isInfinite,
    shownIndex,
    setShownIndex,
    totalCount,
  } = useCarouselControls();
  const nextIndex = shownIndex + delta;

  return (
    <CarouselIconButton
      isDisabled={!isInfinite && (nextIndex < 0 || nextIndex >= totalCount)}
      onClick={() => {
        setShownIndex((nextIndex + totalCount) % totalCount);
      }}
      {...restProps}
    />
  );
}
