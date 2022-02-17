import { menuAnatomy as parts } from "@chakra-ui/anatomy"
import type {
  PartsStyleObject,
  SystemStyleObject,
} from "@chakra-ui/theme-tools"
import "@chakra-ui/theme-tools"

const baseStyleList: SystemStyleObject = {
  color: "inherit",
  minW: "3xs",
  py: "2",
  zIndex: 1,
  borderRadius: "md",
  borderWidth: "1px",
  _light: {
    bg: "#fff",
    boxShadow: "sm",
  },
  _dark: {
    bg: "gray.700",
    boxShadow: "dark-lg",
  },
}

const baseStyleItem: SystemStyleObject = {
  py: "0.4rem",
  px: "0.8rem",
  transitionProperty: "background",
  transitionDuration: "ultra-fast",
  transitionTimingFunction: "ease-in",
  _focus: {
    _light: {
      bg: "gray.100",
    },

    _dark: {
      bg: "whiteAlpha.100",
    },
  },
  _active: {
    _light: {
      bg: "gray.200",
    },

    _dark: {
      bg: "whiteAlpha.200",
    },
  },
  _expanded: {
    _light: {
      bg: "gray.100",
    },

    _dark: {
      bg: "whiteAlpha.100",
    },
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
}

const baseStyleGroupTitle: SystemStyleObject = {
  mx: 4,
  my: 2,
  fontWeight: "semibold",
  fontSize: "sm",
}

const baseStyleCommand: SystemStyleObject = {
  opacity: 0.6,
}

const baseStyleDivider: SystemStyleObject = {
  border: 0,
  borderBottom: "1px solid",
  borderColor: "inherit",
  my: "0.5rem",
  opacity: 0.6,
}

const baseStyleButton: SystemStyleObject = {
  transitionProperty: "common",
  transitionDuration: "normal",
}

const baseStyle: PartsStyleObject<typeof parts> = {
  button: baseStyleButton,
  list: baseStyleList,
  item: baseStyleItem,
  groupTitle: baseStyleGroupTitle,
  command: baseStyleCommand,
  divider: baseStyleDivider,
}

export default {
  parts: parts.keys,
  baseStyle,
}
