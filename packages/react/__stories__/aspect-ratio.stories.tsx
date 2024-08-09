import { Box } from "../src"

export default {
  title: "Layout / AspectRatio",
  decorators: [(story: Function) => <Box padding="4">{story()}</Box>],
}

export { AspectRatioWithVideo as WithVideo } from "compositions/examples/aspect-ratio-with-video"
export { AspectRatioWithImage as WithImage } from "compositions/examples/aspect-ratio-with-image"
export { AspectRatioWithMap as WithMap } from "compositions/examples/aspect-ratio-with-map"
export { AspectRatioResponsive as WithResponsive } from "compositions/examples/aspect-ratio-responsive"
