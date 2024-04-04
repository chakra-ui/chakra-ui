export function getIds(id: string | number) {
  return {
    root: `slider-root-${id}`,
    control: `slider-control-${id}`,
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

type StyleOptions = {
  orientation: Orientation
  thumbPercents: number[]
  thumbRects: Array<Size | undefined>
  reversed?: boolean
}

export function getStyles(options: StyleOptions) {
  const { orientation, thumbPercents, thumbRects, reversed } = options

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

  const controlStyle: React.CSSProperties = {
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
  const fallback = [0, reversed ? 100 - thumbPercents[0] : thumbPercents[0]]
  const range = isSingleThumb ? fallback : thumbPercents

  let start = range[0]
  if (!isSingleThumb && reversed) {
    start = 100 - start
  }
  const percent = Math.abs(range[range.length - 1] - range[0])

  const innerTrackStyle: React.CSSProperties = {
    ...trackStyle,
    ...orient({
      orientation,
      vertical: reversed
        ? { height: `${percent}%`, top: `${start}%` }
        : { height: `${percent}%`, bottom: `${start}%` },
      horizontal: reversed
        ? { width: `${percent}%`, right: `${start}%` }
        : { width: `${percent}%`, left: `${start}%` },
    }),
  }

  return { trackStyle, innerTrackStyle, controlStyle, getThumbStyle }
}

export function getReversed(options: {
  reversed?: boolean
  direction: "ltr" | "rtl"
  orientation?: "horizontal" | "vertical"
}) {
  const { reversed, direction, orientation } = options

  if (direction === "ltr" || orientation === "vertical") {
    return reversed
  }
  // only flip for horizontal RTL
  // if isReserved 🔜  otherwise  🔚
  return !reversed
}
