import { PropGetter } from "@chakra-ui/react-utils"
import { useCallback, useMemo } from "react"
import { useMultiSliderContext } from "./multi-slider-context"
import { orient, getTrackPercent } from "./multi-slider-utils"

export type UseMultiSliderInnerTrackProps = {
  startThumbKey?: number
  endThumbKey?: number
}

export function useMultiSliderInnerTrack(props: UseMultiSliderInnerTrackProps) {
  const { startThumbKey, endThumbKey } = props
  const { values, min, max, orientation, isReversed } = useMultiSliderContext()
  const startValueContext = isReversed ? max : min
  const endValueContext = isReversed ? min : max
  const startValue =
    (startThumbKey !== undefined ? values[startThumbKey] : startValueContext) ??
    startValueContext
  const endValue =
    (endThumbKey !== undefined ? values[endThumbKey] : endValueContext) ??
    endValueContext
  const startTrackPercent = getTrackPercent(startValue, min, max, isReversed)
  const endTrackPercent = getTrackPercent(endValue, min, max, isReversed)

  const innerTrackStyle: React.CSSProperties = useMemo(
    () => ({
      position: "absolute",
      ...orient({
        orientation,
        vertical: {
          top: `${startTrackPercent}%`,
          height: `${endTrackPercent - startTrackPercent}%`,
          left: "50%",
          transform: "translateX(-50%)",
        },
        horizontal: {
          left: `${startTrackPercent}%`,
          width: `${endTrackPercent - startTrackPercent}%`,
        },
      }),
    }),
    [endTrackPercent, orientation, startTrackPercent],
  )

  const getInnerTrackProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref,
      style: {
        ...props.style,
        ...innerTrackStyle,
      },
    }),
    [innerTrackStyle],
  )

  return {
    getInnerTrackProps,
  }
}
