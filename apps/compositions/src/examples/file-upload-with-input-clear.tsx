import { CloseButton, FileUpload, Input, InputGroup } from "@chakra-ui/react"
import { LuFileUp } from "react-icons/lu"

export const FileUploadWithInputClear = () => {
  return (
    <FileUpload.Root gap="1" maxWidth="300px">
      <FileUpload.HiddenInput />
      <FileUpload.Label>Upload file</FileUpload.Label>
      <InputGroup
        startElement={<LuFileUp />}
        endElement={
          <FileUpload.ClearTrigger asChild>
            <CloseButton
              me="-1"
              size="xs"
              variant="plain"
              focusVisibleRing="inside"
              focusRingWidth="2px"
              pointerEvents="auto"
            />
          </FileUpload.ClearTrigger>
        }
      >
        <Input asChild>
          <FileUpload.Trigger>
            <FileUpload.FileText lineClamp={1} />
          </FileUpload.Trigger>
        </Input>
      </InputGroup>
    </FileUpload.Root>
  )
}
