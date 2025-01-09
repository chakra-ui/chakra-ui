import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Image",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { ImageBasic as Basic } from "compositions/examples/image-basic"
export { ImageCircular as Circular } from "compositions/examples/image-circular"
export { ImageWithAspectRatio as AspectRatio } from "compositions/examples/image-with-aspect-ratio"
export { ImageWithFit as Fit } from "compositions/examples/image-with-fit"
export { ImageWithHeight as Height } from "compositions/examples/image-with-height"
export { ImageWithHtmlHeight as HtmlHeight } from "compositions/examples/image-with-html-height"
