import { mapEntries } from "@chakra-ui/utils"
import { selectAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"
import { inputRecipe } from "./input"

export const nativeSelectSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      width: "100%",
      height: "fit-content",
      position: "relative",
    },
    field: {
      ...inputRecipe.base,
      paddingEnd: "2rem",
      appearance: "none",
      paddingBottom: "1px",
      lineHeight: "normal",
      bg: { base: "white", _dark: "gray.700" },
      _focus: {
        zIndex: "unset",
      },
      "& > option, & > optgroup": {
        bg: "inherit",
      },
    },
    icon: {
      position: "absolute",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none",
      top: "50%",
      transform: "translateY(-50%)",
      width: "6",
      height: "100%",
      color: "currentColor",
      fontSize: "xl",
      _disabled: {
        opacity: 0.5,
      },
    },
  },
  variants: {
    variant: mapEntries(inputRecipe.variants!.variant, (variant, styles) => [
      variant,
      { field: styles },
    ]),
    size: mapEntries(inputRecipe.variants!.size, (size, styles) => [
      size,
      {
        field: { ...styles, paddingEnd: "8" },
        icon: {
          insetEnd: size === "sm" ? "1" : "2",
        },
      },
    ]),
  },
  defaultVariants: inputRecipe.defaultVariants,
})
