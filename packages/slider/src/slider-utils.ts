import type { CSSProperties } from "react"

export function getIds(id: string | number) {
  return {
    root: `slider-root-${id}`,
    getThumb: (i: number) => `slider-thumb-${id}-${i}`,
    getInput: (i: number) => `slider-input-${id}-${i}`,
    track: `slider-track-${id}`,
    innerTrack: `slider-filled-track-${id}`,
    getMarker: (i: number) => `slider-marker-${id}-${i}`,
    output: `slider-output-${id}`,
  }
}

type Orientation = "vertical" | "horizontal"

export function orient(options: {
  orientation: Orientation
  vertical: CSSProperties
  horizontal: CSSProperties
}) {
  const { orientation, vertical, horizontal } = options
  return orientation === "vertical" ? vertical : horizontal
}

type Size = { height: number; width: number }

const zeroRect: Size = { width: 0, height: 0 }

export function getStyles(options: {
  orientation: Orientation
  thumbPercents: number[]
  thumbRects: Size[]
  isReversed?: boolean
}) {
  const { orientation, thumbPercents, thumbRects, isReversed } = options

  const getThumbStyle = (i: number): CSSProperties => ({
    position: "absolute",
    userSelect: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    touchAction: "none",
    ...orient({
      orientation,
      vertical: {
        bottom: `calc(${thumbPercents[i]}% - ${thumbRects[i].height / 2}px)`,
      },
      horizontal: {
        left: `calc(${thumbPercents[i]}% - ${thumbRects[i].width / 2}px)`,
      },
    }),
  })

  const size =
    orientation === "vertical"
      ? thumbRects.reduce((a, b) => (a.height > b.height ? a : b), zeroRect)
      : thumbRects.reduce((a, b) => (a.width > b.width ? a : b), zeroRect)

  const rootStyle: CSSProperties = {
    position: "relative",
    touchAction: "none",
    WebkitTapHighlightColor: "rgba(0,0,0,0)",
    userSelect: "none",
    outline: 0,
    ...orient({
      orientation,
      vertical: {
        paddingLeft: size.width / 2,
        paddingRight: size.width / 2,
      },
      horizontal: {
        paddingTop: size.height / 2,
        paddingBottom: size.height / 2,
      },
    }),
  }

  const trackStyle: React.CSSProperties = {
    position: "absolute",
    ...orient({
      orientation,
      vertical: {
        left: "50%",
        transform: "translateX(-50%)",
        height: "100%",
      },
      horizontal: {
        top: "50%",
        transform: "translateY(-50%)",
        width: "100%",
      },
    }),
  }

  const isSingleThumb = thumbPercents.length === 1
  const fallback = [0, isReversed ? 100 - thumbPercents[0] : thumbPercents[0]]
  const range = isSingleThumb ? fallback : thumbPercents

  let start = range[0]
  if (!isSingleThumb && isReversed) {
    start = 100 - start
  }
  const percent = Math.abs(range[range.length - 1] - range[0])

  const innerTrackStyle: React.CSSProperties = {
    ...trackStyle,
    ...orient({
      orientation,
      vertical: isReversed
        ? { height: `${percent}%`, top: `${start}%` }
        : { height: `${percent}%`, bottom: `${start}%` },
      horizontal: isReversed
        ? { width: `${percent}%`, right: `${start}%` }
        : { width: `${percent}%`, left: `${start}%` },
    }),
  }

  return { trackStyle, innerTrackStyle, rootStyle, getThumbStyle }
}

export function getIsReversed(options: {
  isReversed?: boolean
  direction: "ltr" | "rtl"
  orientation?: "horizontal" | "vertical"
}) {
  const { isReversed, direction, orientation } = options

  if (direction === "ltr" || orientation === "vertical") {
    return isReversed
  }
  // only flip for horizontal RTL
  // if isReserved 🔜  otherwise  🔚
  return !isReversed
}
