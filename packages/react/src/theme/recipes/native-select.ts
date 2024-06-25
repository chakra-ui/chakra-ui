import { nativeSelectAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"
import { selectSlotRecipe } from "./select"

export const nativeSelectSlotRecipe = defineSlotRecipe({
  slots: nativeSelectAnatomy.keys(),

  base: {
    root: {
      height: "fit-content",
      display: "flex",
      position: "relative",
      colorPalette: "gray",
    },
    field: {
      width: "100%",
      minWidth: 0,
      outline: 0,
      appearance: "none",
      _disabled: {
        layerStyle: "disabled",
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      focusRing: "extend",
      lineHeight: "normal",
      "& > option, & > optgroup": {
        bg: "inherit",
      },
    },
    indicator: {
      position: "absolute",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none",
      top: "50%",
      transform: "translateY(-50%)",
      height: "100%",
      color: "fg.subtle",
      _disabled: {
        opacity: "0.5",
      },
      "& svg": {
        width: "4",
        height: "4",
      },
    },
  },

  variants: {
    variant: {
      outline: {
        field: selectSlotRecipe.variants?.variant.outline.trigger,
      },
      filled: {
        field: selectSlotRecipe.variants?.variant.filled.trigger,
      },
    },

    size: {
      lg: {
        field: {
          fontSize: "md",
          ps: "4",
          pe: "8",
          borderRadius: "md",
          height: "12",
        },
        indicator: {
          insetEnd: "2",
        },
      },

      md: {
        field: {
          fontSize: "sm",
          ps: "3",
          pe: "8",
          borderRadius: "md",
          height: "10",
        },
        indicator: {
          insetEnd: "4",
        },
      },

      sm: {
        field: {
          fontSize: "sm",
          ps: "3",
          pe: "8",
          borderRadius: "sm",
          height: "8",
        },
        indicator: {
          insetEnd: "3",
        },
      },

      xs: {
        field: {
          fontSize: "xs",
          ps: "2",
          pe: "6",
          borderRadius: "sm",
          height: "6",
        },
        indicator: {
          insetEnd: "1",
        },
      },
    },
  },

  defaultVariants: selectSlotRecipe.defaultVariants,
})
