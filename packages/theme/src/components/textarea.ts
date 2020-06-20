import Input, { InputSizes, InputTheme, InputVariants } from "./input"

const Textarea: InputTheme = {
  ...Input,
  baseStyle: {
    ...Input.baseStyle,
    paddingY: "8px",
    minHeight: "80px",
    lineHeight: "short",
  },
}

export const TextareaVariants = InputVariants
export const TextareaSizes = InputSizes

export default Textarea
