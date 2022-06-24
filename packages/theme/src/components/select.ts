import { ComponentMultiStyleConfig } from "@chakra-ui/react"
import { getColor, mode } from "@chakra-ui/theme-tools"
import { Input } from "."

const SelectStyles: ComponentMultiStyleConfig = {
  parts: ["wrapper", "input", "trigger", "menu", "option", "popover"],
  baseStyle: (props) => {
    const { isOpen, colorScheme, invalid, theme } = props
    const focusBorder = {
      borderColor: mode("blue.500", "blue.300")(props),
      boxShadow: `0 0 0 1px ${getColor(
        theme,
        mode("blue.500", "blue.300")(props),
      )}`,
    }

    return {
      wrapper: {
        position: "relative",
      },
      input: {
        display: "none",
        width: "100%",
      },
      trigger: {
        ...Input.baseStyle.field,
        justifyContent: "space-between",
        alignItems: "center",
        p: "12px 20px",
        h: 0,
        display: "flex",
        fontSize: "sm",
        width: "100%",
        borderRadius: "base",
        borderWidth: "1px",
        borderStyle: "solid",
        height: "100%",
        _disabled: {
          opacity: 0.4,
          cursor: "not-allowed",
        },
        ...(invalid && {
          borderColor: mode("red.500", "red.300")(props),
          boxShadow: `0 0 0 1px ${getColor(
            theme,
            mode("red.500", "red.300")(props),
          )}`,
        }),
        _hover: {
          borderColor: mode("gray.300", "whiteAlpha.400")(props),
        },
        _focus: {
          zIndex: 1,
          ...focusBorder,
        },
        ...(isOpen && focusBorder),
        ".chakra-select__trigger-label": {
          flex: 1,
          textAlign: "left",
          display: "block",
        },
      },
      menu: {
        bg: mode("#fff", "gray.700")(props),
        width: "100%",
        maxHeight: "211px",
        overflowY: "auto",
        margin: "3px 0 0",
        position: "absolute",
        zIndex: "dropdown",
        listStyle: "none",
        borderWidth: "1px",
        borderRadius: "md",
        boxShadow: mode("sm", "dark-lg")(props),
      },
      option: {
        py: "1.5",
        px: "3",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "default",
        ".chakra-select__option-label": {
          flex: 1,
          px: "2",
        },
        _hover: {
          bg: mode("gray.100", "whiteAlpha.100")(props),
        },
        _focus: {
          bg: mode("gray.100", "whiteAlpha.100")(props),
        },
        "&.chakra-select__option-disabled": {
          bg: "gray.100",
          color: "gray.600",
          cursor: "not-allowed",
        },
        "&.chakra-select__option-active": {
          color: "white",
          backgroundColor: `${colorScheme}.600`,
        },
      },
    }
  },
  sizes: {
    sm: {
      trigger: {
        height: "32px",
        fontSize: "sm",
      },
    },
    md: {
      trigger: {
        height: "42px",
        fontSize: "md",
      },
    },
    lg: {
      trigger: {
        height: "50px",
        fontSize: "md",
      },
    },
  },
  defaultProps: {
    isOpen: false,
    colorScheme: "blue",
  },
}

export default SelectStyles
