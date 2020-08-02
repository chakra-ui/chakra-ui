import { multiStyleConfig } from "@chakra-ui/theme-tools"
import checkbox from "./checkbox"

const radio = multiStyleConfig({
  parts: {
    control: "the radio input container",
    label: "the radio label",
  },

  baseStyle: function (props) {
    const { label, control } = checkbox.baseStyle?.(props) ?? {}
    return {
      label,
      control: {
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
      },
    }
  },

  sizes: {
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
  },

  defaultProps: {
    size: "md",
    colorScheme: "blue",
  },
})

export default radio
