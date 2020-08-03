import { styleConfig } from "@chakra-ui/theme-tools"
import { inputStyles } from "./input"

const baseStyle = {
  ...inputStyles.baseStyle?.field,
  textAlign: "center",
}

const sizes = {
  lg: {
    fontSize: "lg",
    w: 12,
    h: 12,
    borderRadius: "md",
  },
  md: {
    fontSize: "md",
    w: 10,
    h: 10,
    borderRadius: "md",
  },
  sm: {
    fontSize: "sm",
    w: 8,
    h: 8,
    borderRadius: "sm",
  },
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

const defaultProps = inputStyles.defaultProps

const pinInput = styleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps,
})

export const pinInputStyles = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
}

export default pinInput
