import { useContext, useCallback } from "react";
import { usePreferredMotionIntensity } from "web-api-hooks";
import CarouselContext from "./CarouselContext";

function mod(dividend: number, divisor: number) {
  return ((dividend % divisor) + divisor) % divisor;
}

export default function useCarouselControls() {
  const [
    ,
    ,
    ,
    [activeIndex, setActiveIndex],
    [totalCount],
    slidesRef,
    [isPlaying, setPlaying],
    isInfinite,
  ] = useContext(CarouselContext);

  // TODO: Replace this check with CSS when no polyfill is required
  const preferReducedMotion = usePreferredMotionIntensity() === "reduce";

  const goTo = useCallback(
    (index: React.SetStateAction<number>) => {
      setActiveIndex(prevIndex => {
        const nextIndex =
          typeof index !== "function" ? index : index(prevIndex);
        if (nextIndex < 0 || nextIndex >= totalCount) return prevIndex;

        const slide = slidesRef.current[nextIndex];
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        slide.parentElement!.scroll({
          left: slide.offsetLeft,
          ...(!preferReducedMotion && { behavior: "smooth" }),
        });
        return nextIndex;
      });
    },
    [preferReducedMotion, setActiveIndex, slidesRef, totalCount],
  );

  return {
    isInfinite,

    isPlaying,
    togglePlaying: useCallback(() => {
      setPlaying(prevPlaying => !prevPlaying);
    }, [setPlaying]),

    activeIndex,
    totalCount,
    goTo,
    jump: useCallback(
      (delta: number) => {
        goTo(prevIndex => {
          const sum = prevIndex + delta;
          return isInfinite ? mod(sum, totalCount) : sum;
        });
      },
      [goTo, isInfinite, totalCount],
    ),
  };
}
