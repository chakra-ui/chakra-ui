const parts = ["label", "number", "icon", "helpText"]

const baseStyleLabel = {
  fontWeight: "medium",
}

const baseStyleHelpText = {
  opacity: 0.8,
  marginBottom: 2,
}

const baseStyleNumber = {
  verticalAlign: "baseline",
  fontWeight: "semibold",
}

const baseStyleIcon = {
  mr: 1,
  w: "14px",
  h: "14px",
  verticalAlign: "middle",
}

const baseStyle = {
  label: baseStyleLabel,
  helpText: baseStyleHelpText,
  number: baseStyleNumber,
  icon: baseStyleIcon,
}

const sizes = {
  md: {
    label: { fontSize: "sm" },
    helpText: { fontSize: "sm" },
    number: { fontSize: "2xl" },
  },
}

const defaultProps = {
  size: "md",
}

export default {
  parts,
  baseStyle,
  sizes,
  defaultProps,
}
