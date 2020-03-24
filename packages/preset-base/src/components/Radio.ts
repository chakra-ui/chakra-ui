import Checkbox from "./Checkbox"
import { ComponentTheme } from "./utils"

const baseStyle = Checkbox.baseStyle as Function

const Radio: ComponentTheme = {
  defaultProps: {
    size: "md",
  },
  baseStyle: props => ({
    ...baseStyle(props),
    borderRadius: "full",
    _checked: {
      ...baseStyle(props)["_checked"],
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
  }),
  sizes: {
    ...Checkbox.sizes,
    sm: { width: 3, height: 3 },
  },
}

export default Radio
