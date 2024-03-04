import { tableAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const tableSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      fontVariantNumeric: "lining-nums tabular-nums",
      borderCollapse: "collapse",
      width: "full",
    },
    columnHeader: {
      fontFamily: "heading",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "wider",
      textAlign: "start",
    },
    cell: {
      textAlign: "start",
    },
    caption: {
      mt: 4,
      fontFamily: "heading",
      textAlign: "center",
      fontWeight: "medium",
    },
  },
  variants: {
    numeric: {
      true: {
        columnHeader: { textAlign: "end" },
        cell: { textAlign: "end" },
      },
    },
    variant: {
      simple: {
        columnHeader: {
          color: { base: "gray.600", _dark: "gray.400" },
          borderBottomWidth: "1px",
          borderColor: { base: "colorPalette.100", _dark: "colorPalette.700" },
        },
        cell: {
          borderBottomWidth: "1px",
          borderColor: { base: "colorPalette.100", _dark: "colorPalette.700" },
        },
        caption: {
          color: { base: "gray.600", _dark: "gray.100" },
        },
        footer: {
          "& tr:last-of-type th": {
            borderBottomWidth: 0,
          },
        },
      },
      stripe: {
        columnHeader: {
          color: { base: "gray.600", _dark: "gray.400" },
          borderBottomWidth: "1px",
          borderColor: { base: "colorPalette.100", _dark: "colorPalette.700" },
        },
        cell: {
          borderBottomWidth: "1px",
          borderColor: { base: "colorPalette.100", _dark: "colorPalette.700" },
        },
        caption: {
          color: { base: "gray.600", _dark: "gray.100" },
        },
        body: {
          "& tr:nth-of-type(odd)": {
            "& :where(th, td)": {
              borderBottomWidth: "1px",
              borderColor: {
                base: "colorPalette.100",
                _dark: "colorPalette.700",
              },
            },
            "& td": {
              bg: { base: "colorPalette.100", _dark: "colorPalette.700" },
            },
          },
        },
        footer: {
          "& tr:last-of-type th": {
            borderBottomWidth: 0,
          },
        },
      },
    },
    size: {
      sm: {
        columnHeader: {
          px: "4",
          py: "1",
          lineHeight: "4",
          fontSize: "xs",
        },
        cell: {
          px: "4",
          py: "2",
          fontSize: "sm",
          lineHeight: "4",
        },
        caption: {
          px: "4",
          py: "2",
          fontSize: "xs",
        },
      },
      md: {
        columnHeader: {
          px: "6",
          py: "3",
          lineHeight: "4",
          fontSize: "xs",
        },
        cell: {
          px: "6",
          py: "4",
          lineHeight: "5",
        },
        caption: {
          px: "6",
          py: "2",
          fontSize: "sm",
        },
      },
      lg: {
        columnHeader: {
          px: "8",
          py: "4",
          lineHeight: "5",
          fontSize: "sm",
        },
        cell: {
          px: "8",
          py: "5",
          lineHeight: "6",
        },
        caption: {
          px: "6",
          py: "2",
          fontSize: "md",
        },
      },
    },
  },
  defaultVariants: {
    variant: "simple",
    size: "md",
  },
})
