import { fileUploadAnatomy } from "@ark-ui/anatomy"
import { HiX } from "react-icons/hi"
import { Button, FileUpload, IconButton, defineSlotRecipe } from "../src"

export default {
  title: "Components / File Upload",
}

// https://park-ui.com/docs/panda/components/file-upload
export const fileUpload = defineSlotRecipe({
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
      fontSize: "sm",
    },
    dropzone: {
      alignItems: "center",
      background: "bg.default",
      borderRadius: "l3",
      borderWidth: "1px",
      display: "flex",
      flexDirection: "column",
      gap: "3",
      justifyContent: "center",
      minHeight: "xs",
      px: "6",
      py: "4",
    },
    item: {
      animation: "fadeIn 0.25s ease-out",
      background: "bg.default",
      borderRadius: "l3",
      borderWidth: "1px",
      columnGap: "3",
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      gridTemplateAreas: `
        "preview name delete"
        "preview size delete"
        `,
      p: "4",
    },
    itemGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "3",
    },
    itemName: {
      color: "fg.default",
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

export const Basic = () => (
  <FileUpload.Root maxFiles={5} recipe={fileUpload}>
    {(api) => (
      <>
        <FileUpload.Dropzone>
          <FileUpload.Label fontWeight="medium">
            Drag your file(s) here
          </FileUpload.Label>
          <Button asChild>
            <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
          </Button>
        </FileUpload.Dropzone>

        <FileUpload.ItemGroup>
          {api.files.map((file, id) => (
            <FileUpload.Item key={id} file={file}>
              <FileUpload.ItemPreview type="image/*">
                <FileUpload.ItemPreviewImage />
              </FileUpload.ItemPreview>

              <FileUpload.ItemPreview type=".*">
                {/* <FileIcon /> */}
              </FileUpload.ItemPreview>

              <FileUpload.ItemName />
              <FileUpload.ItemSizeText />
              <IconButton variant="outline" size="sm" asChild>
                <FileUpload.ItemDeleteTrigger>
                  <HiX />
                </FileUpload.ItemDeleteTrigger>
              </IconButton>
            </FileUpload.Item>
          ))}
        </FileUpload.ItemGroup>
      </>
    )}
  </FileUpload.Root>
)
