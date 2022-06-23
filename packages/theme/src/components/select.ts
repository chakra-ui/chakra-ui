import { ComponentMultiStyleConfig } from "@chakra-ui/react"

const SelectStyles: ComponentMultiStyleConfig = {
  parts: ["wrapper", "input", "button", "menu", "option", "popover"],
  baseStyle: ({ isOpen, colorScheme, invalid }) => ({
    wrapper: {
      position: "relative",
      minWidth: "211px",
    },
    input: {
      display: "none",
      width: "100%",
    },
    button: {
      justifyContent: "space-between",
      alignItems: "center",
      p: "12px 20px",
      h: 0,
      fontSize: "14px",
      fontWeight: 400,
      bg: "none",
      width: "100%",
      borderRadius: "4px",
      borderWidth: "1px",
      borderColor: isOpen ? "blue.600" : "gray.200",
      height: "100%",
      _disabled: {
        bg: "gray.100",
        color: "gray.600",
        _hover: {
          borderColor: "gray.100",
          bg: "gray.300",
          cursor: "not-allowed",
        },
      },
      ...(invalid && {
        borderColor: "red.600",
        color: "red.700",
        _hover: {
          borderColor: "red.600",
        },
      }),
      _hover: {
        bg: "none",
        borderColor: "blue.600",
      },
      _active: {
        bg: "none",
      },
      _focus: {
        borderColor: "blue.600",
        _hover: {
          borderColor: "blue.700",
        },
      },
      ".chakra-select__button-label": {
        flex: 1,
        textAlign: "left",
      },
    },
    menu: {
      width: "100%",
      maxHeight: "211px",
      overflowY: "auto",
      margin: "3px 0 0",
      position: "absolute",
      zIndex: "1000",
      listStyle: "none",
      padding: 0,
      background: "white",
      borderWidth: isOpen ? "1px" : 0,
      borderStyle: "solid",
      borderColor: "gray.200",
      borderRadius: "8px",
    },
    option: {
      p: "8px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      ".chakra-select__option-label": {
        flex: 1,
        px: "8px",
      },
      _hover: {
        bg: `${colorScheme}.50`,
        color: `${colorScheme}.600`,
      },
      _focus: {
        outline: "none",
        boxShadow: "none",
        bg: `${colorScheme}.50`,
        color: `${colorScheme}.600`,
      },
      "&.chakra-option-disabled": {
        bg: "gray.100",
        color: "gray.600",
        cursor: "not-allowed",
      },
      "&.chakra-select__option-active": {
        color: "white",
        backgroundColor: `${colorScheme}.600`,
        fontWeight: "semibold",
        _hover: {
          color: "white",
          bg: `${colorScheme}.700`,
        },
      },
    },
    popover: {
      width: "100%",
      _focus: {
        boxShadow: "none",
      },
    },
  }),
  variants: {
    filled: ({ invalid, colorScheme }) => ({
      button: {
        border: "none",
        bg: "gray.50",
        color: "gray.600",
        _hover: {
          border: "none",
          bg: "blue.50",
          color: "blue.600",
        },
        _focus: {
          border: "1px solid",
          bg: "none",
          color: `${colorScheme}.600`,
          _hover: {
            border: "1px solid",
            bg: "none",
            color: `${colorScheme}.700`,
          },
        },
        _disabled: {
          border: "none",
          bg: "blackAlpha.50",
          color: "gray.500",
          _hover: {
            border: "none",
            bg: "gray.100",
            color: "gray.600",
          },
        },
        ...(invalid && {
          border: "none",
          bg: "red.100",
          color: "red.600",
          _hover: {
            border: "none",
            bg: "red.200",
            color: "red.800",
          },
        }),
      },
      option: {
        "&.chakra-option-disabled": {
          color: "gray.500",
          cursor: "not-allowed",
        },
      },
    }),
  },
  sizes: {
    sm: {
      button: {
        height: "32px",
        fontSize: "12px",
      },
    },
    md: {
      button: {
        height: "42px",
      },
    },
    lg: {
      button: {
        height: "50px",
        fontSize: "16px",
      },
    },
  },
  defaultProps: {
    isOpen: false,
    colorScheme: "blue",
  },
}

export default SelectStyles
