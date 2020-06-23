import {
  ComponentTheme,
  mode,
  Props,
  getColor,
  StyleObject,
} from "@chakra-ui/theme-tools"

export interface InputProps {
  focusBorderColor?: string
  errorBorderColor?: string
}

type VariantProps = Props & Required<InputProps>

const getDefaults = (props: VariantProps) => ({
  focusBorderColor:
    props.focusBorderColor || mode("blue.500", "blue.300")(props),
  errorBorderColor: props.errorBorderColor || mode("red.500", "red.300")(props),
})

function getOutlineStyle(props: VariantProps): StyleObject {
  const { theme: t } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    border: "1px solid",
    borderColor: mode("inherit", "whiteAlpha.50")(props),
    bg: mode("white", "whiteAlpha.100")(props),
    _hover: {
      borderColor: mode("gray.300", "whiteAlpha.200")(props),
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
    _focus: {
      zIndex: 1,
      borderColor: getColor(t, fc),
      boxShadow: `0 0 0 1px ${getColor(t, fc)}`,
    },
    _invalid: {
      borderColor: getColor(t, ec),
      boxShadow: `0 0 0 1px ${getColor(t, ec)}`,
    },
  }
}

function getFilledStyle(props: VariantProps): StyleObject {
  const { theme: t } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    border: "2px solid",
    borderColor: "transparent",
    bg: mode("gray.100", "whiteAlpha.50")(props),
    _hover: {
      bg: mode("gray.200", "whiteAlpha.100")(props),
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
    _focus: {
      zIndex: 1,
      bg: "transparent",
      borderColor: getColor(t, fc),
    },
    _invalid: {
      borderColor: getColor(t, ec),
    },
  }
}

function getFlushedStyle(props: VariantProps): StyleObject {
  const { theme: t } = props

  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    borderBottom: "2px solid",
    borderColor: "inherit",
    borderRadius: 0,
    paddingX: 0,
    bg: "transparent",
    _focus: {
      zIndex: 1,
      borderColor: getColor(t, fc),
    },
    _invalid: {
      borderColor: getColor(t, ec),
    },
  }
}

const unstyled = {
  bg: "transparent",
  paddingX: 0,
  height: "auto",
}

const sizes: InputTheme["sizes"] = {
  lg: {
    fontSize: "lg",
    paddingX: 4,
    paddingY: 2,
    minHeight: 12,
    borderRadius: "md",
  },
  md: {
    fontSize: "md",
    paddingX: 4,
    paddingY: 2,
    minHeight: 10,
    borderRadius: "md",
  },
  sm: {
    fontSize: "sm",
    paddingX: 3,
    paddingY: 1,
    minHeight: 8,
    borderRadius: "sm",
  },
}

export type InputTheme = ComponentTheme<InputProps>

const Input: InputTheme = {
  defaultProps: {
    size: "md",
    variant: "outline",
  },
  baseStyle: {
    width: "100%",
    outline: 0,
    lineHeight: 1,
    transitionDuration: "0.2s",
    transitionProperty: "box-shadow, border, color, background-color",
  },
  sizes,
  variants: {
    outline: getOutlineStyle,
    filled: getFilledStyle,
    flushed: getFlushedStyle,
    unstyled,
  },
}

export const InputSizes = {
  sm: "sm",
  md: "md",
  lg: "lg",
}

export const InputVariants = {
  outline: "outline",
  filled: "filled",
  flushed: "flushed",
  unstyled: "unstyled",
}

export default Input
