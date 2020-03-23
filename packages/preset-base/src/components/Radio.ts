import Checkbox from "./Checkbox"
import { ComponentTheme } from "./utils"

const Radio = {
  defaultProps: {
    size: "md",
  },
  baseStyle: (props: any) => ({
    //@ts-ignore
    ...Checkbox.baseStyle(props),
    borderRadius: "full",
    _checked: {
      //@ts-ignore
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
  sizes: {
    ...Checkbox.sizes,
    sm: { size: 3 },
  },
}

export default Radio
