import { mode, orient } from "@chakra-ui/theme-tools"

function thumbOrientation(props: Record<string, any>) {
  return orient({
    orientation: props.orientation,
    vertical: {
      left: "50%",
      transform: `translateX(-50%)`,
      _active: {
        transform: `translateX(-50%) scale(1.15)`,
      },
    },
    horizontal: {
      top: "50%",
      transform: `translateY(-50%)`,
      _active: {
        transform: `translateY(-50%) scale(1.15)`,
      },
    },
  })
}

const parts = {
  container: "the slider wrapper",
  thumb: "the slider thumb or handle",
  track: "the slider outer track",
  filledTrack: "the slider inner/filled track",
}

const baseStyleContainer = function (props: Record<string, any>) {
  const { orientation } = props

  return {
    _disabled: {
      opacity: 0.6,
      cursor: "default",
      pointerEvents: "none",
    },
    ...orient({
      orientation,
      vertical: { h: "100%" },
      horizontal: { w: "100%" },
    }),
  }
}

const baseStyleTrack = function (props: Record<string, any>) {
  return {
    borderRadius: "sm",
    bg: mode("gray.200", "whiteAlpha.200")(props),
    _disabled: {
      bg: mode("gray.300", "whiteAlpha.300")(props),
    },
  }
}

const baseStyleThumb = function (props: Record<string, any>) {
  return {
    zIndex: 1,
    borderRadius: "full",
    bg: "white",
    boxShadow: "base",
    border: "1px solid",
    borderColor: "transparent",
    transition: "transform 0.2s",
    _focus: { boxShadow: "outline" },
    _disabled: { bg: "gray.300" },
    ...thumbOrientation(props),
  }
}

const baseStyleFilledTrack = function (props: Record<string, any>) {
  const { colorScheme: c } = props

  return {
    bg: mode(`${c}.500`, `${c}.200`)(props),
  }
}

const baseStyle = (props: Record<string, any>) => ({
  container: baseStyleContainer(props),
  track: baseStyleTrack(props),
  thumb: baseStyleThumb(props),
  filledTrack: baseStyleFilledTrack(props),
})

const sizes = {
  lg: function (props: Record<string, any>) {
    return {
      thumb: { w: "16px", h: "16px" },
      track: orient({
        orientation: props.orientation,
        horizontal: { h: "4px" },
        vertical: { w: "4px" },
      }),
    }
  },

  md: function (props: Record<string, any>) {
    return {
      thumb: { w: "14px", h: "14px" },
      track: orient({
        orientation: props.orientation,
        horizontal: { h: "4px" },
        vertical: { w: "4px" },
      }),
    }
  },

  sm: function (props: Record<string, any>) {
    return {
      thumb: { w: "10px", h: "10px" },
      track: orient({
        orientation: props.orientation,
        horizontal: { h: "2px" },
        vertical: { w: "2px" },
      }),
    }
  },
}

const defaultProps = {
  size: "md",
  colorScheme: "blue",
}

export default {
  parts,
  sizes,
  baseStyle,
  defaultProps,
}
