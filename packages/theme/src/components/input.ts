import { inputAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from "@chakra-ui/styled-system"
import { type CSSVar, getColor, mode } from "@chakra-ui/theme-tools"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const $fieldHeight = cssVar("input-field-height")
const $fieldFontSize = cssVar("input-field-font-size")
const $fieldPadding = cssVar("input-field-padding")
const $fieldBorderRadius = cssVar("input-field-border-radius")

const $height = cssVar("input-height", $fieldHeight.reference)
const $fontSize = cssVar("input-font-size", $fieldFontSize.reference)
const $padding = cssVar("input-padding", $fieldPadding.reference)
const $borderRadius = cssVar(
  "input-border-radius",
  $fieldBorderRadius.reference,
)

const baseStyle = definePartsStyle({
  addon: {
    height: $height.reference,
    fontSize: $fontSize.reference,
    px: $padding.reference,
    borderRadius: $borderRadius.reference,
  },
  field: {
    width: "100%",
    height: $height.reference,
    fontSize: $fontSize.reference,
    px: $padding.reference,
    borderRadius: $borderRadius.reference,
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    transitionProperty: "common",
    transitionDuration: "normal",
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
})

const toPartStyle = ({
  $fontSize,
  $padding,
  $borderRadius,
  $height,
}: {
  $fontSize: CSSVar
  $padding: CSSVar
  $borderRadius: CSSVar
  $height: CSSVar
}) => {
  return {
    lg: defineStyle({
      [$fontSize.variable]: "fontSizes.lg",
      [$padding.variable]: "space.4",
      [$borderRadius.variable]: "radii.md",
      [$height.variable]: "sizes.12",
    }),
    md: defineStyle({
      [$fontSize.variable]: "fontSizes.md",
      [$padding.variable]: "space.4",
      [$borderRadius.variable]: "radii.md",
      [$height.variable]: "sizes.10",
    }),
    sm: defineStyle({
      [$fontSize.variable]: "fontSizes.sm",
      [$padding.variable]: "space.3",
      [$borderRadius.variable]: "radii.sm",
      [$height.variable]: "sizes.8",
    }),
    xs: defineStyle({
      [$fontSize.variable]: "fontSizes.xs",
      [$padding.variable]: "space.2",
      [$borderRadius.variable]: "radii.sm",
      [$height.variable]: "sizes.6",
    }),
  }
}

const size = {
  group: toPartStyle({ $fontSize, $padding, $borderRadius, $height }),
  field: toPartStyle({
    $fontSize: $fieldFontSize,
    $padding: $fieldPadding,
    $borderRadius: $fieldBorderRadius,
    $height: $fieldHeight,
  }),
}

const sizes = {
  lg: definePartsStyle({
    field: size.field.lg,
    group: size.group.lg,
  }),
  md: definePartsStyle({
    field: size.field.md,
    group: size.group.md,
  }),
  sm: definePartsStyle({
    field: size.field.sm,
    group: size.group.sm,
  }),
  xs: definePartsStyle({
    field: size.field.xs,
    group: size.group.xs,
  }),
}

function getDefaults(props: Record<string, any>) {
  const { focusBorderColor: fc, errorBorderColor: ec } = props
  return {
    focusBorderColor: fc || mode("blue.500", "blue.300")(props),
    errorBorderColor: ec || mode("red.500", "red.300")(props),
  }
}

const variantOutline = definePartsStyle((props) => {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    field: {
      border: "1px solid",
      borderColor: "inherit",
      bg: "inherit",
      _hover: {
        borderColor: mode("gray.300", "whiteAlpha.400")(props),
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _invalid: {
        borderColor: getColor(theme, ec),
        boxShadow: `0 0 0 1px ${getColor(theme, ec)}`,
      },
      _focusVisible: {
        zIndex: 1,
        borderColor: getColor(theme, fc),
        boxShadow: `0 0 0 1px ${getColor(theme, fc)}`,
      },
    },
    addon: {
      border: "1px solid",
      borderColor: mode("inherit", "whiteAlpha.50")(props),
      bg: mode("gray.100", "whiteAlpha.300")(props),
    },
  }
})

const variantFilled = definePartsStyle((props) => {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    field: {
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
      _invalid: {
        borderColor: getColor(theme, ec),
      },
      _focusVisible: {
        bg: "transparent",
        borderColor: getColor(theme, fc),
      },
    },
    addon: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props),
    },
  }
})

const variantFlushed = definePartsStyle((props) => {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    field: {
      borderBottom: "1px solid",
      borderColor: "inherit",
      borderRadius: "0",
      px: "0",
      bg: "transparent",
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _invalid: {
        borderColor: getColor(theme, ec),
        boxShadow: `0px 1px 0px 0px ${getColor(theme, ec)}`,
      },
      _focusVisible: {
        borderColor: getColor(theme, fc),
        boxShadow: `0px 1px 0px 0px ${getColor(theme, fc)}`,
      },
    },
    addon: {
      borderBottom: "2px solid",
      borderColor: "inherit",
      borderRadius: "0",
      px: "0",
      bg: "transparent",
    },
  }
})

const variantUnstyled = definePartsStyle({
  field: {
    bg: "transparent",
    px: "0",
    height: "auto",
  },
  addon: {
    bg: "transparent",
    px: "0",
    height: "auto",
  },
})

const variants = {
  outline: variantOutline,
  filled: variantFilled,
  flushed: variantFlushed,
  unstyled: variantUnstyled,
}

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: "md",
    variant: "outline",
  },
})
