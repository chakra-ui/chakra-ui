import Input, { InputVariants, InputSizes, InputOptions } from "./input"
import { ExtendProps } from "@chakra-ui/theme-tools"

const Select = {
  defaultProps: Input.defaultProps,
  baseStyle: {
    Field: {
      ...Input.baseStyle.Input,
      appearance: "none",
      paddingRight: "2rem",
      paddingBottom: "1px",
      lineHeight: "normal",
    },
    Icon: {
      color: "currentColor",
      fontSize: "1.25rem",
      _disabled: {
        opacity: 0.5,
      },
    },
  },
  sizes: {
    sm: {
      Fieid: Input.sizes.sm["Input"],
    },
    md: {
      Fieid: Input.sizes.md["Input"],
    },
    lg: {
      Fieid: Input.sizes.lg["Input"],
    },
  },
  variants: (props: ExtendProps<InputOptions>) => ({
    outline: {
      Field: Input.variants.outline(props)["Input"],
    },
    filled: {
      Field: Input.variants.filled(props)["Input"],
    },
    flushed: {
      Field: Input.variants.flushed(props)["Input"],
    },
    unstyled: {
      Field: Input.variants.unstyled["Input"],
    },
  }),
}

export const SelectSizes = InputSizes
export const SelectVariants = InputVariants

export default Select
