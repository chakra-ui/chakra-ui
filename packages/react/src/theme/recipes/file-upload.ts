import { fileUploadAnatomy } from "../../anatomy"
import { defineSlotRecipe } from "../../styled-system"

export const fileUploadSlotRecipe = defineSlotRecipe({
  className: "chakra-file-upload",
  slots: fileUploadAnatomy.keys(),
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "4",
      width: "100%",
    },
    label: {
      fontWeight: "medium",
      textStyle: "sm",
    },
    dropzone: {
      background: "bg",
      borderRadius: "md",
      borderWidth: "2px",
      borderStyle: "dashed",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      gap: "3",
      justifyContent: "center",
      minHeight: "2xs",
      px: "3",
      py: "2",
      transition: "backgrounds",
      focusVisibleRing: "outside",
      _hover: {
        bg: "bg.muted",
      },
      _dragging: {
        bg: "colorPalette.muted",
        borderStyle: "solid",
        borderColor: "colorPalette.solid",
      },
    },
    item: {
      textStyle: "sm",
      animationName: "fade-in",
      animationDuration: "moderate",
      background: "bg",
      borderRadius: "sm",
      borderWidth: "1px",
      display: "flex",
      alignItems: "center",
      gap: "3",
      p: "4",
    },
    itemGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "3",
    },
    itemName: {
      color: "fg",
      fontWeight: "medium",
    },
    itemSizeText: {
      color: "fg.subtle",
      textStyle: "xs",
    },
    itemDeleteTrigger: {
      alignSelf: "flex-start",
    },
    itemPreviewImage: {
      width: "10",
      height: "10",
      objectFit: "scale-down",
    },
  },

  defaultVariants: {},
})
