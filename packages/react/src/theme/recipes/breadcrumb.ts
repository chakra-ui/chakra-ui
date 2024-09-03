import { breadcrumbAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const breadcrumbSlotRecipe = defineSlotRecipe({
  className: "chakra-breadcrumb",
  slots: breadcrumbAnatomy.keys(),
  base: {
    list: {
      display: "flex",
      alignItems: "center",
      wordBreak: "break-word",
      color: "fg.subtle",
    },
    link: {
      outline: "0",
      textDecoration: "none",
      rounded: "xs",
      focusRing: "outside",
      display: "inline-flex",
      alignItems: "center",
      gap: "2",
    },
    item: {
      display: "inline-flex",
      alignItems: "center",
    },
    separator: {
      color: "fg.subtle",
      opacity: "0.8",
      _icon: {
        boxSize: "1em",
      },
    },
    ellipsis: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      _icon: {
        boxSize: "1em",
      },
    },
  },

  variants: {
    variant: {
      underline: {
        link: {
          color: "colorPalette.fg",
          textDecoration: "underline",
          textUnderlineOffset: "0.2em",
          textDecorationColor: "colorPalette.emphasized",
        },
        currentLink: {
          color: "colorPalette.fg",
        },
      },
      plain: {
        link: {
          color: "fg.subtle",
          _hover: { color: "fg" },
        },
        currentLink: {
          color: "fg",
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

  defaultVariants: {
    variant: "plain",
    size: "md",
  },
})
