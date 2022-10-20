import { checkboxAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from "@chakra-ui/styled-system"
import { runIfFn } from "../utils/run-if-fn"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const $size = cssVar("checkbox-size")
const $bg = cssVar("background-color")
const $fg = cssVar("color")
const $bc = cssVar("border-color")

const baseStyleControl = defineStyle((props) => {
  const { colorScheme: c } = props

  return {
    w: $size.reference,
    h: $size.reference,
    transitionProperty: "box-shadow",
    transitionDuration: "normal",
    border: "2px solid",
    borderRadius: "sm",
    [$fg.variable]: `inherit`,
    [$bg.variable]: `colors.white`,

    _checked: {
      [$bc.variable]: `colors.${c}.500`,
      [$bg.variable]: `colors.${c}.500`,
      [$fg.variable]: `colors.white`,
      _dark: {
        [$bc.variable]: `colors.${c}.200`,
        [$bg.variable]: `colors.${c}.200`,
        [$fg.variable]: `colors.gray.900`,
      },

      _hover: {
        [$bc.variable]: `colors.${c}.600`,
        [$bg.variable]: `colors.${c}.600`,
        _dark: {
          [$bc.variable]: `colors.${c}.400`,
          [$bg.variable]: `colors.${c}.300`,
        },
      },

      _disabled: {
        [$bc.variable]: `colors.gray.200`,
        [$bg.variable]: `colors.gray.200`,
        [$fg.variable]: `colors.gray.500`,
        _dark: {
          [$bc.variable]: `transparent`,
          [$bg.variable]: `colors.whiteAlpha.300`,
          [$fg.variable]: `colors.whiteAlpha.500`,
        },
      },
    },

    _indeterminate: {
      [$bc.variable]: `colors.${c}.500`,
      [$bg.variable]: `colors.${c}.500`,
      [$fg.variable]: `colors.white`,
      _dark: {
        [$bc.variable]: `colors.${c}.200`,
        [$bg.variable]: `colors.${c}.200`,
        [$fg.variable]: `colors.gray.900`,
      },
    },

    _disabled: {
      [$bg.variable]: `colors.gray.100`,
      [$bc.variable]: `colors.gray.100`,
      _dark: {
        [$bg.variable]: `colors.whiteAlpha.100`,
        [$bc.variable]: `transparent`,
      },
    },

    _focusVisible: {
      boxShadow: "outline",
    },

    _invalid: {
      [$bc.variable]: `colors.red.500`,
      _dark: {
        [$bc.variable]: `colors.red.300`,
      },
    },

    bg: $bg.reference,
    color: $fg.reference,
    borderColor: $bc.reference,
  }
})

const baseStyleContainer = defineStyle({
  _disabled: { cursor: "not-allowed" },
})

const baseStyleLabel = defineStyle({
  userSelect: "none",
  _disabled: { opacity: 0.4 },
})

const baseStyleIcon = defineStyle({
  transitionProperty: "transform",
  transitionDuration: "normal",
})

const baseStyle = definePartsStyle((props) => ({
  icon: baseStyleIcon,
  container: baseStyleContainer,
  control: runIfFn(baseStyleControl, props),
  label: baseStyleLabel,
}))

const sizes = {
  sm: definePartsStyle({
    control: { [$size.variable]: "sizes.3" },
    label: { fontSize: "sm" },
    icon: { fontSize: "3xs" },
  }),
  md: definePartsStyle({
    control: { [$size.variable]: "sizes.4" },
    label: { fontSize: "md" },
    icon: { fontSize: "2xs" },
  }),
  lg: definePartsStyle({
    control: { [$size.variable]: "sizes.5" },
    label: { fontSize: "lg" },
    icon: { fontSize: "2xs" },
  }),
}

export const checkboxTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: "md",
    colorScheme: "blue",
  },
})
