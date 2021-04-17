const baseStyle = {
  width: "var(--spinner-size)",
  height: "var(--spinner-size)",
}

const sizes = {
  xs: {
    "--spinner-size": "0.75rem",
  },
  sm: {
    "--spinner-size": "1rem",
  },
  md: {
    "--spinner-size": "1.5rem",
  },
  lg: {
    "--spinner-size": "2rem",
  },
  xl: {
    "--spinner-size": "3rem",
  },
}

const defaultProps = {
  size: "md",
}

export default {
  baseStyle,
  sizes,
  defaultProps,
}
