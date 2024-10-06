import { nativeSelectAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"
import { selectSlotRecipe } from "./select"

export const nativeSelectSlotRecipe = defineSlotRecipe({
  className: "chakra-native-select",
  slots: nativeSelectAnatomy.keys(),

  base: {
    root: {
      height: "fit-content",
      display: "flex",
      width: "100%",
      position: "relative",
    },
    field: {
      width: "100%",
      minWidth: 0,
      outline: 0,
      appearance: "none",
      _disabled: {
        layerStyle: "disabled",
      },
      _invalid: {
        borderColor: "border.error",
      },
      focusVisibleRing: "outside",
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
      _invalid: {
        color: "fg.error",
      },
      _icon: {
        width: "1em",
        height: "1em",
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
      plain: {},
    },

    size: {
      lg: {
        field: {
          textStyle: "md",
          ps: "4",
          pe: "8",
          borderRadius: "md",
          height: "12",
        },
        indicator: {
          textStyle: "xl",
          insetEnd: "3",
        },
      },

      md: {
        field: {
          textStyle: "sm",
          ps: "3",
          pe: "8",
          borderRadius: "md",
          height: "10",
        },
        indicator: {
          textStyle: "lg",
          insetEnd: "2",
        },
      },

      sm: {
        field: {
          textStyle: "sm",
          ps: "3",
          pe: "8",
          borderRadius: "sm",
          height: "8",
        },
        indicator: {
          textStyle: "md",
          insetEnd: "2",
        },
      },

      xs: {
        field: {
          textStyle: "xs",
          ps: "2",
          pe: "6",
          borderRadius: "sm",
          height: "6",
        },
        indicator: {
          textStyle: "sm",
          insetEnd: "1.5",
        },
      },
    },
  },

  defaultVariants: selectSlotRecipe.defaultVariants,
})
