import {
  BaseStyle,
  DefaultProps,
  mode,
  orient,
  Sizes,
} from "@chakra-ui/theme-tools"

const register = {
  parts: ["container", "thumb", "track", "filledTrack"],
  sizes: ["sm", "md", "lg"],
} as const

const baseStyle: BaseStyle<typeof register> = (props) => {
  return {
    container: {
      _disabled: {
        opacity: 0.6,
        cursor: "default",
        pointerEvents: "none",
      },
      ...orient({
        orientation: props.orientation,
        vertical: { height: "100%" },
        horizontal: { width: "100%" },
      }),
    },
    track: {
      borderRadius: "sm",
      bg: mode("gray.200", "whiteAlpha.200")(props),
      _disabled: {
        bg: mode("gray.300", "whiteAlpha.300")(props),
      },
    },
    thumb: {
      zIndex: 1,
      borderRadius: "full",
      bg: "white",
      boxShadow: "sm",
      border: "1px solid",
      borderColor: "transparent",
      transition: "transform 0.2s",
      _focus: {
        boxShadow: "outline",
      },
      _disabled: {
        bg: "gray.300",
      },
      ...orient({
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
      }),
    },
    filledTrack: {
      bg: mode(`${props.colorScheme}.500`, `${props.colorScheme}.200`)(props),
    },
  }
}

const sizes: Sizes<typeof register> = {
  lg: function (props) {
    return {
      thumb: { width: "16px", height: "16px" },
      track: orient({
        orientation: props.orientation,
        horizontal: { height: "4px" },
        vertical: { width: "4px" },
      }),
    }
  },

  md: function (props) {
    return {
      thumb: { width: "14px", height: "14px" },
      track: orient({
        orientation: props.orientation,
        horizontal: { height: "4px" },
        vertical: { width: "4px" },
      }),
    }
  },

  sm: function (props) {
    return {
      thumb: { width: "10px", height: "10px" },
      track: orient({
        orientation: props.orientation,
        horizontal: { height: "2px" },
        vertical: { width: "2px" },
      }),
    }
  },
}

const defaultProps: DefaultProps<typeof register> = {
  size: "md",
  colorScheme: "blue",
}

const slider = {
  defaultProps,
  sizes,
  baseStyle,
}

export default slider
