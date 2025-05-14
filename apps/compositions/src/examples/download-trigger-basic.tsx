import { Button, DownloadTrigger } from "@chakra-ui/react"

const data = "The quick brown fox jumps over the lazy dog"

export const DownloadTriggerBasic = () => {
  return (
    <DownloadTrigger
      data={data}
      fileName="sample.txt"
      mimeType="text/plain"
      asChild
    >
      <Button variant="outline">Download txt</Button>
    </DownloadTrigger>
  )
}
