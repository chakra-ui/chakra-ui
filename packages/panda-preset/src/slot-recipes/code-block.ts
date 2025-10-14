import { defineSlotRecipe } from "../def"

export const codeBlockSlotRecipe = defineSlotRecipe({
  slots: [
    "root",
    "content",
    "title",
    "header",
    "footer",
    "control",
    "overlay",
    "code",
    "codeText",
    "copyTrigger",
    "copyIndicator",
    "collapseTrigger",
    "collapseIndicator",
    "collapseText",
  ],
  className: "code-block",
  base: {
    root: {
      colorPalette: "gray",
      rounded: "var(--code-block-radius)",
      overflow: "hidden",
      bg: "bg",
      color: "fg",
      borderWidth: "1px",
      "--code-block-max-height": "320px",
      "--code-block-bg": "colors.bg",
      "--code-block-fg": "colors.fg",
      "--code-block-obscured-opacity": "0.5",
      "--code-block-obscured-blur": "1px",
      "--code-block-line-number-width": "sizes.3",
      "--code-block-line-number-margin": "spacing.4",
      "--code-block-highlight-bg": "{colors.teal.focusRing/20}",
      "--code-block-highlight-border": "colors.teal.focusRing",
      "--code-block-highlight-added-bg": "{colors.green.focusRing/20}",
      "--code-block-highlight-added-border": "colors.green.focusRing",
      "--code-block-highlight-removed-bg": "{colors.red.focusRing/20}",
      "--code-block-highlight-removed-border": "colors.red.focusRing",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "2",
      position: "relative",
      px: "var(--code-block-padding)",
      minH: "var(--code-block-header-height)",
      mb: "calc(var(--code-block-padding) / 2 * -1)",
    },
    title: {
      display: "inline-flex",
      alignItems: "center",
      gap: "1.5",
      flex: "1",
      color: "fg.muted",
    },
    control: {
      gap: "1.5",
      display: "inline-flex",
      alignItems: "center",
    },
    footer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "2",
      px: "var(--code-block-padding)",
      minH: "var(--code-block-header-height)",
    },
    content: {
      position: "relative",
      colorScheme: "dark",
      overflow: "hidden",
      borderBottomRadius: "var(--code-block-radius)",
      maxHeight: "var(--code-block-max-height)",
      "& ::selection": {
        bg: "blue.500/40",
      },
      _expanded: {
        maxHeight: "unset",
      },
    },
    overlay: {
      "--bg": "{colors.black/50}",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      padding: "4",
      bgImage: "linear-gradient(0deg,var(--bg) 25%,transparent 100%)",
      color: "white",
      minH: "5rem",
      pos: "absolute",
      bottom: "0",
      insetInline: "0",
      zIndex: "1",
      fontWeight: "medium",
      _expanded: {
        display: "none",
      },
    },
    code: {
      fontFamily: "mono",
      lineHeight: "tall",
      whiteSpace: "pre",
      counterReset: "line 0",
    },
    codeText: {
      px: "var(--code-block-padding)",
      py: "var(--code-block-padding)",
      position: "relative",
      display: "block",
      width: "100%",
      "&[data-has-focused]": {
        "& [data-line]:not([data-focused])": {
          transitionProperty: "opacity, filter",
          transitionDuration: "moderate",
          transitionTimingFunction: "ease-in-out",
          opacity: "var(--code-block-obscured-opacity)",
          filter: "blur(var(--code-block-obscured-blur))",
        },
        "&:hover": {
          "--code-block-obscured-opacity": "1",
          "--code-block-obscured-blur": "0px",
        },
      },
      "&[data-has-line-numbers][data-plaintext]": {
        paddingInlineStart:
          "calc(var(--code-block-line-number-width) + var(--code-block-line-number-margin) + var(--code-block-padding))",
      },
      "& [data-line]": {
        position: "relative",
        "--highlight-bg": "var(--code-block-highlight-bg)",
        "--highlight-border": "var(--code-block-highlight-border)",
        "&[data-highlight], &[data-diff]": {
          display: "inline-block",
          width: "full",
          "&:after": {
            content: "''",
            display: "block",
            position: "absolute",
            insetStart: "calc(var(--code-block-padding) * -1)",
            insetEnd: "0px",
            width: "calc(100% + var(--code-block-padding) * 2)",
            height: "100%",
            bg: "var(--highlight-bg)",
            borderStartWidth: "2px",
            borderStartColor: "var(--highlight-border)",
          },
        },
        "&[data-diff='added']": {
          "--highlight-bg": "var(--code-block-highlight-added-bg)",
          "--highlight-border": "var(--code-block-highlight-added-border)",
        },
        "&[data-diff='removed']": {
          "--highlight-bg": "var(--code-block-highlight-removed-bg)",
          "--highlight-border": "var(--code-block-highlight-removed-border)",
        },
      },
      "&[data-word-wrap]": {
        "&[data-plaintext], & [data-line]": {
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
        },
      },
      "&[data-has-line-numbers]": {
        "--content": "counter(line)",
        "& [data-line]:before": {
          content: "var(--content)",
          counterIncrement: "line",
          width: "var(--code-block-line-number-width)",
          marginRight: "var(--code-block-line-number-margin)",
          display: "inline-block",
          textAlign: "end",
          userSelect: "none",
          opacity: 0.4,
        },
        "& [data-diff='added']:before": {
          content: "'+'",
        },
        "& [data-diff='removed']:before": {
          content: "'-'",
        },
      },
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          "--code-block-padding": "spacing.4",
          "--code-block-radius": "radii.md",
          "--code-block-header-height": "sizes.8",
        },
        title: {
          textStyle: "xs",
        },
        code: {
          fontSize: "xs",
        },
      },
      md: {
        root: {
          "--code-block-padding": "spacing.4",
          "--code-block-radius": "radii.lg",
          "--code-block-header-height": "sizes.10",
        },
        title: {
          textStyle: "xs",
        },
        code: {
          fontSize: "sm",
        },
      },
      lg: {
        root: {
          "--code-block-padding": "spacing.5",
          "--code-block-radius": "radii.xl",
          "--code-block-header-height": "sizes.12",
        },
        title: {
          textStyle: "sm",
        },
        code: {
          fontSize: "sm",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})
