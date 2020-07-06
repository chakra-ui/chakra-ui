import {
  BaseStyle,
  runIfFn,
  Sizes,
  SizeType,
  Variants,
  VariantType,
} from "@chakra-ui/theme-tools"
import input from "./input"

const register = {
  parts: ["field", "icon"],
  sizes: input.register.sizes,
  variants: input.register.variants,
} as const

const baseStyle: BaseStyle<typeof register> = {
  field: {
    ...input.baseStyle.input,
    appearance: "none",
    paddingRight: "2rem",
    paddingBottom: "1px",
    lineHeight: "normal",
  },
  icon: {
    color: "currentColor",
    fontSize: "1.25rem",
    _disabled: { opacity: 0.5 },
  },
}

const sizes: Sizes<typeof register> = {
  sm: {
    field: getSizeStyle("sm").input,
  },
  md: {
    field: getSizeStyle("md").input,
  },
  lg: {
    field: getSizeStyle("lg").input,
  },
}

const variants: Variants<typeof register> = {
  outline: (props) => ({ field: getVariantStyle("outline", props) }),
  filled: (props) => ({ field: getVariantStyle("filled", props) }),
  flushed: (props) => ({ field: getVariantStyle("flushed", props) }),
  unstyled: (props) => ({ field: getVariantStyle("unstyled", props) }),
}

const defaultProps = input.defaultProps

const select = {
  register,
  defaultProps,
  baseStyle,
  sizes,
  variants,
}

export default select

function getSizeStyle(size: SizeType<typeof register>) {
  return runIfFn(input.sizes[size], undefined) ?? {}
}

function getVariantStyle(size: VariantType<typeof register>, props: any) {
  const variantStyle = runIfFn(input.variants[size], props) ?? {}
  return variantStyle.input
}
