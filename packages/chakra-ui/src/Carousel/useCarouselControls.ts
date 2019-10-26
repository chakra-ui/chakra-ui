import { useContext } from "react";
import CarouselContext from "./CarouselContext";

export default function useCarouselControls() {
  const [
    ,
    ,
    ,
    [shownIndex, setShownIndex],
    [totalCount],
    [isPlaying, setPlaying],
    isInfinite,
  ] = useContext(CarouselContext);

  return {
    isInfinite,

    isPlaying,
    togglePlaying() {
      setPlaying(prevPlaying => !prevPlaying);
    },

    shownIndex,
    setShownIndex,
    totalCount,
  };
}
