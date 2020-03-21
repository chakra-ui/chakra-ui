import Checkbox from "./Checkbox"
import { ComponentTheme } from "./utils"

const Radio: ComponentTheme = {
  baseStyle: props => ({
    ...Checkbox.baseStyle(props),
    borderRadius: "full",
    _checked: {
      ...Checkbox.baseStyle(props)["_checked"],
      _before: {
        content: `""`,
        display: "inline-block",
        position: "relative",
        size: "50%",
        borderRadius: "50%",
        bg: "currentColor",
      },
    },
  }),
  variantSize: {
    ...Checkbox.variantSize,
    sm: { size: 3 },
  },
}

export default Radio
