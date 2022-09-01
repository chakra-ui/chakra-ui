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
  vertical: React.CSSProperties
  horizontal: React.CSSProperties
}) {
  const { orientation, vertical, horizontal } = options
  return orientation === "vertical" ? vertical : horizontal
}

type Size = { height: number; width: number }

const zeroSize: Size = { width: 0, height: 0 }

const normalize = (a: Size | undefined) => a || zeroSize

export function getStyles(options: {
  orientation: Orientation
  thumbPercents: number[]
  thumbRects: Array<Size | undefined>
  isReversed?: boolean
}) {
  const { orientation, thumbPercents, thumbRects, isReversed } = options

  const getThumbStyle = (i: number): React.CSSProperties => {
    const rect = thumbRects[i] ?? zeroSize
    return {
      position: "absolute",
      userSelect: "none",
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
      touchAction: "none",
      ...orient({
        orientation,
        vertical: {
          bottom: `calc(${thumbPercents[i]}% - ${rect.height / 2}px)`,
        },
        horizontal: {
          left: `calc(${thumbPercents[i]}% - ${rect.width / 2}px)`,
        },
      }),
    }
  }

  const size =
    orientation === "vertical"
      ? thumbRects.reduce(
          (a, b) => (normalize(a).height > normalize(b).height ? a : b),
          zeroSize,
        )
      : thumbRects.reduce(
          (a, b) => (normalize(a).width > normalize(b).width ? a : b),
          zeroSize,
        )

  const rootStyle: React.CSSProperties = {
    position: "relative",
    touchAction: "none",
    WebkitTapHighlightColor: "rgba(0,0,0,0)",
    userSelect: "none",
    outline: 0,
    ...orient({
      orientation,
      vertical: size
        ? {
            paddingLeft: size.width / 2,
            paddingRight: size.width / 2,
          }
        : {},
      horizontal: size
        ? {
            paddingTop: size.height / 2,
            paddingBottom: size.height / 2,
          }
        : {},
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
