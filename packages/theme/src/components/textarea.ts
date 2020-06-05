import Input, { InputTheme, InputTokens } from "./Input"

const Textarea: InputTheme = {
  ...Input,
  baseStyle: {
    ...Input.baseStyle,
    paddingY: "8px",
    minHeight: "80px",
    lineHeight: "short",
  },
}

export const TextareaTokens = InputTokens

export default Textarea
