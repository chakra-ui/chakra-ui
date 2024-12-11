import { CloseButton } from "compositions/ui/close-button"
import {
  FileInput,
  FileUploadClearTrigger,
  FileUploadLabel,
  FileUploadRoot,
} from "compositions/ui/file-upload"
import { InputGroup } from "compositions/ui/input-group"
import { LuFileUp } from "react-icons/lu"

export const FileUploadWithInputClear = () => {
  return (
    <FileUploadRoot gap="1" maxWidth="300px">
      <FileUploadLabel>Upload file</FileUploadLabel>
      <InputGroup
        w="full"
        startElement={<LuFileUp />}
        endElement={
          <FileUploadClearTrigger asChild>
            <CloseButton
              me="-1"
              size="xs"
              variant="plain"
              focusVisibleRing="inside"
              focusRingWidth="2px"
              pointerEvents="auto"
              color="fg.subtle"
            />
          </FileUploadClearTrigger>
        }
      >
        <FileInput />
      </InputGroup>
    </FileUploadRoot>
  )
}
