import { defineSlotRecipe } from "../def"

export const qrCodeSlotRecipe = defineSlotRecipe({
  slots: ["root", "frame", "pattern", "overlay", "downloadTrigger"],
  className: "qr-code",
  base: {
    root: {
      position: "relative",
      width: "fit-content",
      "--qr-code-overlay-size": "calc(var(--qr-code-size) / 3)",
    },
    frame: {
      width: "var(--qr-code-size)",
      height: "var(--qr-code-size)",
      fill: "currentColor",
    },
    overlay: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "var(--qr-code-overlay-size)",
      height: "var(--qr-code-overlay-size)",
      padding: "1",
      bg: "bg",
      rounded: "l1",
    },
  },
  variants: {
    size: {
      "2xs": {
        root: {
          "--qr-code-size": "40px",
        },
      },
      xs: {
        root: {
          "--qr-code-size": "64px",
        },
      },
      sm: {
        root: {
          "--qr-code-size": "80px",
        },
      },
      md: {
        root: {
          "--qr-code-size": "120px",
        },
      },
      lg: {
        root: {
          "--qr-code-size": "160px",
        },
      },
      xl: {
        root: {
          "--qr-code-size": "200px",
        },
      },
      "2xl": {
        root: {
          "--qr-code-size": "240px",
        },
      },
      full: {
        root: {
          "--qr-code-size": "100%",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})
