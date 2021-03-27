import { mode } from "@chakra-ui/theme-tools"

const parts = ["container", "track", "thumb"]

function baseStyleTrack(props: Record<string, any>) {
  const { colorScheme: c } = props

  return {
    borderRadius: "full",
    p: "2px",
    width: "var(--slider-track-width)",
    height: "var(--slider-track-height)",
    transition: "all 120ms",
    bg: mode("gray.300", "whiteAlpha.400")(props),
    _focus: {
      boxShadow: "outline",
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
    _checked: {
      bg: mode(`${c}.500`, `${c}.200`)(props),
    },
  }
}

const baseStyleThumb = {
  bg: "white",
  transition: "transform 250ms",
  borderRadius: "inherit",
  width: "var(--slider-track-height)",
  height: "var(--slider-track-height)",
  _checked: {
    transform: "translateX(var(--slider-thumb-x))",
  },
}

const baseStyle = (props: Record<string, any>) => ({
  container: {
    "--slider-track-diff":
      "calc(var(--slider-track-width) - var(--slider-track-height))",
    "--slider-thumb-x": "var(--slider-track-diff)",
    _rtl: {
      "--slider-thumb-x": "calc(-1 * var(--slider-track-diff))",
    },
  },
  track: baseStyleTrack(props),
  thumb: baseStyleThumb,
})

const sizes = {
  sm: {
    container: {
      "--slider-track-width": "1.375rem",
      "--slider-track-height": "0.75rem",
    },
  },
  md: {
    container: {
      "--slider-track-width": "1.875rem",
      "--slider-track-height": "1rem",
    },
  },
  lg: {
    container: {
      "--slider-track-width": "2.875rem",
      "--slider-track-height": "1.5rem",
    },
  },
}

const defaultProps = {
  size: "md",
  colorScheme: "blue",
}

export default {
  parts,
  baseStyle,
  sizes,
  defaultProps,
}
