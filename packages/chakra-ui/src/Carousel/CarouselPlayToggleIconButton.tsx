import React, { useContext } from "react";
import useCarouselControls from "./useCarouselControls";
import useFocus from "./useFocus";
import useHover from "./useHover";
import CarouselContext from "./CarouselContext";
import CarouselIconButton, {
  CarouselIconButtonProps,
} from "./CarouselIconButton";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CarouselPlayToggleIconButtonProps
  extends Omit<CarouselIconButtonProps, "aria-label"> {}

export default function CarouselPlayToggleIconButton(
  props: CarouselPlayToggleIconButtonProps,
) {
  const { isPlaying, togglePlaying } = useCarouselControls();

  const [
    isContainerHovered,
    isContainerFocused,
    [disableAutoPause, setDisableAutoPause],
  ] = useContext(CarouselContext);
  const [isHovered, bindHover] = useHover();
  const [isFocused, bindFocus] = useFocus();
  const nextDisableAutoPause =
    (isHovered && !isContainerFocused) ||
    (isFocused && (!isContainerHovered || isHovered));
  if (nextDisableAutoPause !== disableAutoPause) {
    setDisableAutoPause(nextDisableAutoPause);
  }

  return (
    <CarouselIconButton
      aria-label={`${isPlaying ? "Stop" : "Start"} slide rotation`}
      // TODO: Use `pause` and `play` icons once they're available
      icon={isPlaying ? "view-off" : "view"}
      onClick={togglePlaying}
      {...bindHover}
      {...bindFocus}
      {...props}
    />
  );
}
