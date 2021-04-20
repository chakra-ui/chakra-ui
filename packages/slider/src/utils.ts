import { CSSProperties } from "react"

type Orientation = "vertical" | "horizontal"

function orient(options: {
  orientation: Orientation
  vertical: CSSProperties
  horizontal: CSSProperties
}) {
  const { orientation, vertical, horizontal } = options
  return orientation === "vertical" ? vertical : horizontal
}

export function getPartsStyle(options: {
  orientation: Orientation
  trackPercent: number
  thumbRect: { height: number; width: number }
  isReversed?: boolean
}) {
  const { orientation, trackPercent, thumbRect, isReversed } = options

  const thumbStyle: CSSProperties = {
    position: "absolute",
    userSelect: "none",
    touchAction: "none",
    ...orient({
      orientation,
      vertical: {
        bottom: `calc(${trackPercent}% - ${thumbRect.height / 2}px)`,
      },
      horizontal: {
        left: `calc(${trackPercent}% - ${thumbRect.width / 2}px)`,
      },
    }),
  }

  const rootStyle: CSSProperties = {
    position: "relative",
    touchAction: "none",
    WebkitTapHighlightColor: "rgba(0,0,0,0)",
    userSelect: "none",
    outline: 0,
    ...orient({
      orientation,
      vertical: {
        paddingLeft: thumbRect.width / 2,
        paddingRight: thumbRect.width / 2,
      },
      horizontal: {
        paddingTop: thumbRect.height / 2,
        paddingBottom: thumbRect.height / 2,
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

  const innerTrackStyle: React.CSSProperties = {
    ...trackStyle,
    ...orient({
      orientation,
      vertical: isReversed
        ? { height: `${100 - trackPercent}%`, top: 0 }
        : { height: `${trackPercent}%`, bottom: 0 },
      horizontal: isReversed
        ? { width: `${100 - trackPercent}%`, right: 0 }
        : { width: `${trackPercent}%`, left: 0 },
    }),
  }

  return { trackStyle, innerTrackStyle, rootStyle, thumbStyle }
}
