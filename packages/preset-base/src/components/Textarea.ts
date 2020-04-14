import Input, { InputTheme } from "./Input"

const Textarea: InputTheme = {
  ...Input,
  baseStyle: {
    ...Input.baseStyle,
    paddingY: "8px",
    minHeight: "80px",
    lineHeight: "short",
  },
}

export default Textarea
