import { checkboxAnatomy as parts } from "@chakra-ui/anatomy"
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleFunction,
  SystemStyleObject,
} from "@chakra-ui/theme-tools"
import "@chakra-ui/theme-tools"

const baseStyleControl: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props

  return {
    w: "100%",
    transitionProperty: "box-shadow",
    transitionDuration: "normal",
    border: "2px solid",
    borderRadius: "sm",
    borderColor: "inherit",
    color: "white",

    _checked: {
      _hover: {
        _light: {
          bg: `${c}.600`,
          borderColor: `${c}.600`,
        },
        _dark: {
          bg: `${c}.300`,
          borderColor: `${c}.300`,
        },
      },

      _disabled: {
        _light: {
          borderColor: "gray.200",
          bg: "gray.200",
          color: "gray.500",
        },

        _dark: {
          borderColor: "transparent",
          bg: "whiteAlpha.300",
          color: "whiteAlpha.500",
        },
      },

      _light: {
        bg: `${c}.500`,
        borderColor: `${c}.500`,
        color: "white",
      },

      _dark: {
        bg: `${c}.200`,
        borderColor: `${c}.200`,
        color: "gray.900",
      },
    },

    _indeterminate: {
      _light: {
        bg: `${c}.500`,
        borderColor: `${c}.500`,
        color: "white",
      },

      _dark: {
        bg: `${c}.200`,
        borderColor: `${c}.200`,
        color: "gray.900",
      },
    },

    _disabled: {
      _light: {
        bg: "gray.100",
        borderColor: "gray.100",
      },
      _dark: {
        bg: "whiteAlpha.100",
        borderColor: "transparent",
      },
    },

    _focus: {
      boxShadow: "outline",
    },

    _invalid: {
      _light: {
        borderColor: "red.500",
      },

      _dark: {
        borderColor: "red.300",
      },
    },
  }
}

const baseStyleLabel: SystemStyleObject = {
  userSelect: "none",
  _disabled: { opacity: 0.4 },
}

const baseStyleIcon: SystemStyleObject = {
  transitionProperty: "transform",
  transitionDuration: "normal",
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  icon: baseStyleIcon,
  control: baseStyleControl(props),
  label: baseStyleLabel,
})

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  sm: {
    control: { h: 3, w: 3 },
    label: { fontSize: "sm" },
    icon: { fontSize: "0.45rem" },
  },
  md: {
    control: { w: 4, h: 4 },
    label: { fontSize: "md" },
    icon: { fontSize: "0.625rem" },
  },
  lg: {
    control: { w: 5, h: 5 },
    label: { fontSize: "lg" },
    icon: { fontSize: "0.625rem" },
  },
}

const defaultProps = {
  size: "md",
  colorScheme: "blue",
}

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  defaultProps,
}
