import type { Meta } from "@storybook/react"
import { HiX } from "react-icons/hi"
import { Button, FileUpload, IconButton } from "../src"

export default {
  title: "Components / File Upload",
} satisfies Meta

export const Basic = () => (
  <FileUpload.Root maxFiles={5}>
    <FileUpload.HiddenInput />

    <FileUpload.Dropzone>
      <FileUpload.Label fontWeight="medium">
        Drag your file(s) here
      </FileUpload.Label>
      <FileUpload.Trigger asChild>
        <Button>Choose file(s)</Button>
      </FileUpload.Trigger>
    </FileUpload.Dropzone>

    <FileUpload.ItemGroup>
      <FileUpload.Context>
        {({ acceptedFiles }) =>
          acceptedFiles.map((file, id) => (
            <FileUpload.Item key={id} file={file}>
              <FileUpload.ItemPreview type="image/*">
                <FileUpload.ItemPreviewImage />
              </FileUpload.ItemPreview>

              <FileUpload.ItemPreview type=".*">
                {/* <FileIcon /> */}
              </FileUpload.ItemPreview>

              <FileUpload.ItemName />
              <FileUpload.ItemSizeText />
              <FileUpload.ItemDeleteTrigger asChild>
                <IconButton variant="outline" size="sm">
                  <HiX />
                </IconButton>
              </FileUpload.ItemDeleteTrigger>
            </FileUpload.Item>
          ))
        }
      </FileUpload.Context>
    </FileUpload.ItemGroup>
  </FileUpload.Root>
)
