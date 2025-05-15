import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Download Trigger",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { DownloadTriggerBasic as Basic } from "compositions/examples/download-trigger-basic"
export { DownloadTriggerWithFileSize as FileSize } from "compositions/examples/download-trigger-with-file-size"
export { DownloadTriggerSvg as Svg } from "compositions/examples/download-trigger-svg"
export { DownloadTriggerWithPromise as Promise } from "compositions/examples/download-trigger-with-promise"
