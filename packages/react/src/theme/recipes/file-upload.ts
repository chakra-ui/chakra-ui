import { anatomy } from "@ark-ui/anatomy/file-upload"
import { defineSlotRecipe } from "../../styled-system"

export const fileUploadSlotRecipe = defineSlotRecipe({
  slots: anatomy.keys(),
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "4",
      width: "100%",
    },
    label: {
      fontWeight: "medium",
      fontSize: "sm",
    },
    dropzone: {
      background: "bg",
      borderRadius: "md",
      borderWidth: "1px",
      borderStyle: "dashed",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      gap: "3",
      justifyContent: "center",
      minHeight: "xs",
      px: "6",
      py: "4",
      focusRing: "extend",
    },
    item: {
      fontSize: "sm",
      animationName: "fade-in",
      animationDuration: "normal",
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
      fontSize: "xs",
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
})
