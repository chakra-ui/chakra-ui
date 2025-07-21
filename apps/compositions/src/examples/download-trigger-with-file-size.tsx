import { Button, DownloadTrigger, FormatByte } from "@chakra-ui/react"
import { LuDownload } from "react-icons/lu"

const data = "The quick brown fox jumps over the lazy dog"

export const DownloadTriggerWithFileSize = () => {
  return (
    <DownloadTrigger
      data={data}
      fileName="sample.txt"
      mimeType="text/plain"
      asChild
    >
      <Button variant="outline">
        <LuDownload /> Download (
        <FormatByte value={data.length} unitDisplay="narrow" />)
      </Button>
    </DownloadTrigger>
  )
}
