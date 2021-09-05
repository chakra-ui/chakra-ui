import { mergeRefs, PropGetter } from "@chakra-ui/react-utils"
import { dataAttr } from "@chakra-ui/utils"
import { useCallback, useMemo } from "react"
import { useMultiSliderContext } from "./multi-slider-context"
import { orient } from "./multi-slider-utils"

export function useMultiSliderTrack() {
  const { orientation, isDisabled, trackRef } = useMultiSliderContext()

  const trackStyle: React.CSSProperties = useMemo(
    () => ({
      position: "relative",
      ...orient({
        orientation,
        vertical: {
          height: "100%",
        },
        horizontal: {
          width: "100%",
        },
      }),
    }),
    [orientation],
  )

  const getTrackProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref: mergeRefs(ref, trackRef),
      "data-disabled": dataAttr(isDisabled),
      style: {
        ...props.style,
        ...trackStyle,
      },
    }),
    [isDisabled, trackRef, trackStyle],
  )

  return {
    getTrackProps,
  }
}
