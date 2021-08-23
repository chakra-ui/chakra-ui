import type {
  StyleFunctionProps,
  SystemStyleObject,
} from "@chakra-ui/theme-tools"
import { cssVar } from "@chakra-ui/theme-tools"
import Input from "./input"

const inputSize = cssVar("pin-input-size")

const baseStyle: SystemStyleObject = {
  ...Input.baseStyle.field,
  textAlign: "center",
  w: inputSize.reference,
  h: inputSize.reference,
}

const sizes: Record<string, SystemStyleObject> = {
  lg: {
    fontSize: "lg",
    [inputSize.variable]: 12,
    borderRadius: "md",
  },
  md: {
    fontSize: "md",
    [inputSize.variable]: 10,
    borderRadius: "md",
  },
  sm: {
    fontSize: "sm",
    [inputSize.variable]: 8,
    borderRadius: "sm",
  },
  xs: {
    fontSize: "xs",
    [inputSize.variable]: 6,
    borderRadius: "sm",
  },
}

const variants = {
  outline: (props: StyleFunctionProps) => Input.variants.outline(props).field,
  flushed: (props: StyleFunctionProps) => Input.variants.flushed(props).field,
  filled: (props: StyleFunctionProps) => Input.variants.filled(props).field,
  unstyled: Input.variants.unstyled.field,
}

const defaultProps = Input.defaultProps

export default {
  baseStyle,
  sizes,
  variants,
  defaultProps,
}
