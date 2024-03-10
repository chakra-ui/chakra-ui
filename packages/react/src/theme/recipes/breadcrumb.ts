import { breadcrumbAnatomy as parts } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const breadcrumbSlotRecipe = defineSlotRecipe({
  slots: parts.keys,
  base: {
    root: {
      colorPalette: "gray",
    },
    list: {
      display: "flex",
      alignItems: "center",
      wordBreak: "break-word",
      color: "fg.muted",
    },
    link: {
      outline: "0",
      textDecoration: "none",
    },
    item: {
      display: "inline-flex",
      alignItems: "center",
    },
    separator: {
      color: "fg.subtle",
      opacity: "0.8",
      "& svg": {
        boxSize: "1em",
      },
    },
    ellipsis: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      "& svg": {
        boxSize: "1em",
      },
    },
  },
  variants: {
    variant: {
      underline: {
        root: {
          padding: "2",
          borderRadius: "md",
          color: { base: "colorPalette.800", _dark: "colorPalette.400" },
        },
        link: {
          color: { base: "colorPalette.600", _dark: "colorPalette.400" },
          fontWeight: "medium",
          textDecoration: "underline",
          textUnderlineOffset: "0.2em",
          textDecorationColor: {
            base: "colorPalette.600/40",
            _dark: "colorPalette.500/40",
          },
        },
        currentLink: {
          color: { base: "colorPalette.800", _dark: "colorPalette.300" },
          fontWeight: "medium",
        },
      },
      plain: {
        currentLink: {
          color: { base: "colorPalette.600", _dark: "colorPalette.500" },
          fontWeight: "medium",
        },
        link: {
          color: "fg.subtle",
          _hover: {
            textDecoration: "underline",
            color: { base: "colorPalette.700", _dark: "colorPalette.600" },
          },
        },
      },
    },
    size: {
      sm: {
        list: {
          gap: "1",
          fontSize: "xs",
        },
      },
      md: {
        list: {
          gap: "1.5",
          fontSize: "sm",
        },
      },
      lg: {
        list: {
          gap: "2",
          fontSize: "md",
        },
      },
    },
  },
  compoundVariants: [
    {
      colorPalette: "gray",
      variant: "plain",
      css: {
        link: {
          color: "fg.subtle",
          _hover: {
            color: { base: "colorPalette.700", _dark: "colorPalette.300" },
          },
        },
        currentLink: {
          color: { base: "colorPalette.800", _dark: "colorPalette.300" },
        },
      },
    },
  ],
  defaultVariants: {
    variant: "plain",
    size: "md",
    colorPalette: "gray",
  },
})
