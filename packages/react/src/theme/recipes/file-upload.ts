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
      borderRadius: "l3",
      borderWidth: "1px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      gap: "3",
      justifyContent: "center",
      minHeight: "xs",
      px: "6",
      py: "4",
    },
    item: {
      animation: "fade-in 0.25s ease-out",
      background: "bg",
      borderRadius: "l3",
      borderWidth: "1px",
      columnGap: "3",
      display: "flex",
      alignItems: "center",
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
      gridArea: "name",
      fontSize: "sm",
    },
    itemSizeText: {
      color: "fg.muted",
      gridArea: "size",
      fontSize: "sm",
    },
    itemDeleteTrigger: {
      alignSelf: "flex-start",
      gridArea: "delete",
    },
    itemPreview: {
      gridArea: "preview",
    },
    itemPreviewImage: {
      aspectRatio: "1",
      height: "10",
      objectFit: "scale-down",
      width: "10",
    },
  },
})
