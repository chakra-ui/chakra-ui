import { mapEntries } from "@chakra-ui/utils"
import { selectAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"
import { inputRecipe } from "./input"

export const nativeSelectSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      height: "fit-content",
      display: "flex",
      position: "relative",
    },
    field: {
      ...inputRecipe.base,
      width: "100%",
      appearance: "none",
      lineHeight: "normal",
      bg: "bg",
      "& > option, & > optgroup": {
        bg: "inherit",
      },
    },
    indicator: {
      position: "absolute",
      insetEnd: "0",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none",
      top: "50%",
      transform: "translateY(-50%)",
      height: "100%",
      color: "fg.subtle",
      _disabled: {
        opacity: 0.5,
      },
      "& svg": {
        boxSize: "1em",
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
        field: {
          ...styles,
          paddingEnd: "8",
          paddingBlock: "0",
        },
        indicator: {
          insetEnd: size === "sm" ? "1" : "2",
        },
      },
    ]),
  },
  defaultVariants: inputRecipe.defaultVariants,
})
