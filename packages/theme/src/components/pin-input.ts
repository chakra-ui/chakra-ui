import type {
  SystemStyleInterpolation,
  SystemStyleObject,
} from "@chakra-ui/theme-tools"
import Input from "./input"

const baseStyle: SystemStyleObject = {
  ...Input.baseStyle.field,
  textAlign: "center",
}

const sizes: Record<string, SystemStyleObject> = {
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
  xs: {
    fontSize: "xs",
    w: 6,
    h: 6,
    borderRadius: "sm",
  },
}

const variants: Record<string, SystemStyleInterpolation> = {
  outline: (props) => Input.variants.outline(props).field ?? {},
  flushed: (props) => Input.variants.flushed(props).field ?? {},
  filled: (props) => Input.variants.filled(props).field ?? {},
  unstyled: Input.variants.unstyled.field ?? {},
}

const defaultProps = Input.defaultProps

export default {
  baseStyle,
  sizes,
  variants,
  defaultProps,
}
