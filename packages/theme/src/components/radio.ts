import { multiStyleConfig } from "@chakra-ui/theme-tools"
import { checkboxStyles } from "./checkbox"

const parts = {
  control: "the radio input container",
  label: "the radio label",
}

const baseStyleControl = function (props: Record<string, any>) {
  const { control } = checkboxStyles.baseStyle?.(props) ?? {}

  return {
    ...control,
    borderRadius: "full",

    _checked: {
      ...control?.["_checked"],
      _before: {
        content: `""`,
        display: "inline-block",
        position: "relative",
        width: "50%",
        height: "50%",
        borderRadius: "50%",
        bg: "currentColor",
      },
    },
  }
}

const baseStyle = function (props: Record<string, any>) {
  return {
    label: checkboxStyles.baseStyle?.(props).label ?? {},
    control: baseStyleControl(props),
  }
}

const sizes = {
  md: {
    control: { w: 4, h: 4 },
    label: { fontSize: "md" },
  },
  lg: {
    control: { w: 5, h: 5 },
    label: { fontSize: "lg" },
  },
  sm: {
    control: { width: 3, height: 3 },
    label: { fontSize: "sm" },
  },
}

const defaultProps = {
  size: "md",
  colorScheme: "blue",
} as const

const radio = multiStyleConfig({
  parts,
  baseStyle,
  sizes,
  defaultProps,
})

export const radioStyles = {
  parts,
  baseStyle,
  sizes,
  defaultProps,
}

export default radio
