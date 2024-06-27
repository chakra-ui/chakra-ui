import { tableAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const tableSlotRecipe = defineSlotRecipe({
  className: "table",
  slots: tableAnatomy.keys(),
  base: {
    root: {
      fontVariantNumeric: "lining-nums tabular-nums",
      borderCollapse: "collapse",
      width: "full",
      textAlign: "start",
      verticalAlign: "top",
      colorPalette: "gray",
    },
    row: {
      _selected: {
        bg: { base: "colorPalette.100", _dark: "colorPalette.400/20" },
      },
    },
    cell: {
      textAlign: "start",
      alignItems: "center",
    },
    columnHeader: {
      fontWeight: "medium",
      textAlign: "start",
      color: "fg",
    },
    caption: {
      fontWeight: "medium",
      fontSize: "xs",
    },
    footer: {
      fontWeight: "medium",
    },
  },

  variants: {
    interactive: {
      true: {
        body: {
          "& tr": {
            _hover: {
              bg: { base: "colorPalette.100", _dark: "colorPalette.700" },
            },
          },
        },
      },
    },

    stickyHeader: {
      true: {
        columnHeader: {
          position: "sticky",
          top: "var(--sticky-header-offset, 0)",
          zIndex: "sticky",
        },
      },
    },

    striped: {
      true: {
        row: {
          "&:nth-of-type(even) td": {
            bg: "bg.subtle",
          },
        },
      },
    },

    showColumnBorder: {
      true: {
        columnHeader: {
          "&:not(:last-of-type)": {
            borderInlineEndWidth: "1px",
          },
        },
        cell: {
          "&:not(:last-of-type)": {
            borderInlineEndWidth: "1px",
          },
        },
      },
    },

    variant: {
      line: {
        columnHeader: {
          borderBottomWidth: "1px",
        },
        cell: {
          borderBottomWidth: "1px",
        },
      },

      outline: {
        root: {
          boxShadow: "0 0 0 1px {colors.border}",
          borderRadius: "var(--table-radius)",
          overflow: "hidden",
        },
        columnHeader: {
          borderBottomWidth: "1px",
        },
        header: {
          bg: "bg.subtle",
        },
        row: {
          "&:not(:last-of-type)": {
            borderBottomWidth: "1px",
          },
        },
        footer: {
          borderTopWidth: "1px",
        },
      },
    },

    size: {
      sm: {
        root: {
          "--table-radius": "radii.sm",
          fontSize: "sm",
        },
        columnHeader: {
          px: "2",
          py: "2",
        },
        cell: {
          px: "2",
          py: "2",
        },
      },

      md: {
        root: {
          "--table-radius": "radii.md",
          fontSize: "sm",
        },
        columnHeader: {
          px: "3",
          py: "3",
        },
        cell: {
          px: "3",
          py: "3",
        },
      },

      lg: {
        root: {
          "--table-radius": "radii.md",
          fontSize: "md",
        },
        columnHeader: {
          px: "4",
          py: "3",
        },
        cell: {
          px: "4",
          py: "3",
        },
      },
    },
  },

  defaultVariants: {
    variant: "line",
    size: "md",
    colorPalette: "gray",
  },
})
