import { scrollAreaAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const scrollAreaSlotRecipe = defineSlotRecipe({
  className: "chakra-scroll-area",
  slots: scrollAreaAnatomy.keys(),
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      position: "relative",
      overflow: "hidden",
      "--scrollbar-margin": "2px",
      "--scrollbar-click-area":
        "calc(var(--scrollbar-size) + calc(var(--scrollbar-margin) * 2))",
    },
    viewport: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "100%",
      borderRadius: "inherit",
      WebkitOverflowScrolling: "touch",
      scrollbarWidth: "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    content: {
      minWidth: "100%",
    },
    scrollbar: {
      display: "flex",
      userSelect: "none",
      touchAction: "none",
      borderRadius: "full",
      colorPalette: "gray",
      transition: "opacity 150ms 300ms",
      position: "relative",
      margin: "var(--scrollbar-margin)",

      "&:not([data-overflow-x], [data-overflow-y])": {
        display: "none",
      },

      bg: "{colors.colorPalette.solid/10}",
      "--thumb-bg": "{colors.colorPalette.solid/25}",
      "&:is(:hover, :active)": {
        "--thumb-bg": "{colors.colorPalette.solid/50}",
      },

      _before: {
        content: '""',
        position: "absolute",
      },

      _vertical: {
        width: "var(--scrollbar-size)",
        flexDirection: "column",

        "&::before": {
          width: "var(--scrollbar-click-area)",
          height: "100%",
          insetInlineStart: "calc(var(--scrollbar-margin) * -1)",
        },
      },

      _horizontal: {
        height: "var(--scrollbar-size)",
        flexDirection: "row",

        "&::before": {
          height: "var(--scrollbar-click-area)",
          width: "100%",
          top: "calc(var(--scrollbar-margin) * -1)",
        },
      },
    },
    thumb: {
      borderRadius: "inherit",
      bg: "var(--thumb-bg)",
      transition: "backgrounds",
      _vertical: { width: "full" },
      _horizontal: { height: "full" },
    },
    corner: {
      bg: "bg.muted",
      margin: "var(--scrollbar-margin)",
      opacity: 0,
      transition: "opacity 150ms 300ms",
      "[data-hover] ~ &": {
        transitionDelay: "0ms",
        opacity: 1,
      },
    },
  },

  variants: {
    variant: {
      hover: {
        scrollbar: {
          opacity: "0",
          "&[data-hover], &[data-scrolling]": {
            opacity: "1",
            transitionDuration: "faster",
            transitionDelay: "0ms",
          },
        },
      },
      always: {
        scrollbar: {
          opacity: "1",
        },
      },
    },

    size: {
      xs: {
        root: {
          "--scrollbar-size": "sizes.1",
        },
      },
      sm: {
        root: {
          "--scrollbar-size": "sizes.1.5",
        },
      },
      md: {
        root: {
          "--scrollbar-size": "sizes.2",
        },
      },
      lg: {
        root: {
          "--scrollbar-size": "sizes.3",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
    variant: "hover",
  },
})
