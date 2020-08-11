import { styleConfig } from "@chakra-ui/theme-tools"
import { inputStyles } from "./input"

const baseStyle = {
  ...inputStyles.baseStyle?.field,
  paddingY: "8px",
  minHeight: "80px",
  lineHeight: "short",
}

const variants = {
  outline: (props: Record<string, any>) =>
    inputStyles.variants?.outline(props)?.field ?? {},
  flushed: (props: Record<string, any>) =>
    inputStyles.variants?.flushed(props)?.field ?? {},
  filled: (props: Record<string, any>) =>
    inputStyles.variants?.filled(props).field ?? {},
  unstyled: inputStyles.variants?.unstyled.field,
}

const sizes = {
  sm: inputStyles.sizes?.sm.field,
  md: inputStyles.sizes?.md.field,
  lg: inputStyles.sizes?.lg.field,
}

const defaultProps = {
  size: "md",
  variant: "outline",
} as const

const textarea = styleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps,
})

export const textareaStyles = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
}

export default textarea
