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

function getDefaults(props: VariantProps) {
  const { focusBorderColor: fc, errorBorderColor: ec } = props
  return {
    focusBorderColor: fc || mode("blue.500", "blue.300")(props),
    errorBorderColor: ec || mode("red.500", "red.300")(props),
  }
}

function outline(props: VariantProps): StyleObject {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    border: "1px solid",
    borderColor: mode("inherit", "whiteAlpha.50")(props),
    bg: mode("white", "whiteAlpha.100")(props),
    _hover: {
      borderColor: mode("gray.300", "whiteAlpha.200")(props),
    },
    _readOnly: {
      boxShadow: "none !important",
      userSelect: "all",
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
    _focus: {
      zIndex: 1,
      borderColor: getColor(theme, fc),
      boxShadow: `0 0 0 1px ${getColor(theme, fc)}`,
    },
    _invalid: {
      borderColor: getColor(theme, ec),
      boxShadow: `0 0 0 1px ${getColor(theme, ec)}`,
    },
  }
}

function filled(props: VariantProps): StyleObject {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    border: "2px solid",
    borderColor: "transparent",
    bg: mode("gray.100", "whiteAlpha.50")(props),
    _hover: {
      bg: mode("gray.200", "whiteAlpha.100")(props),
    },
    _readOnly: {
      boxShadow: "none !important",
      userSelect: "all",
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
    _focus: {
      zIndex: 1,
      bg: "transparent",
      borderColor: getColor(theme, fc),
    },
    _invalid: {
      borderColor: getColor(theme, ec),
    },
  }
}

function flushed(props: VariantProps): StyleObject {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    borderBottom: "2px solid",
    borderColor: "inherit",
    borderRadius: 0,
    paddingX: 0,
    bg: "transparent",
    _readOnly: {
      boxShadow: "none !important",
      userSelect: "all",
    },
    _focus: {
      zIndex: 1,
      borderColor: getColor(theme, fc),
    },
    _invalid: {
      borderColor: getColor(theme, ec),
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
    paddingLeft: 4,
    paddingRight: 4,
    height: 12,
    borderRadius: "md",
  },
  md: {
    fontSize: "md",
    paddingLeft: 4,
    paddingRight: 4,
    height: 10,
    borderRadius: "md",
  },
  sm: {
    fontSize: "sm",
    paddingLeft: 3,
    paddingRight: 3,
    height: 8,
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
    position: "relative",
    appearance: "none",
    transition: "all 0.2s",
  },
  sizes,
  variants: {
    outline,
    filled,
    flushed,
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
