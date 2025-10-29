import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Components / Carousel",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { CarouselBasic as Basic } from "compositions/examples/carousel-basic"
export { CarouselControlled as Controlled } from "compositions/examples/carousel-controlled"
export { CarouselSlidesPerPage as SlidesPerPage } from "compositions/examples/carousel-slides-per-page"
export { CarouselSpacing as Spacing } from "compositions/examples/carousel-spacing"
export { CarouselWithIndicators as WithIndicators } from "compositions/examples/carousel-with-indicators"
export { CarouselWithOrientation as Orientation } from "compositions/examples/carousel-with-orientation"
export { CarouselWithAutoplay as WithAutoplay } from "compositions/examples/carousel-with-autoplay"
export { CarouselWithLoop as WithLoop } from "compositions/examples/carousel-with-loop"
export { CarouselWithMouseDrag as WithMouseDrag } from "compositions/examples/carousel-with-mouse-drag"
export { CarouselWithStore as WithStore } from "compositions/examples/carousel-with-store"
export { CarouselWithVariableWidth as WithVariableWidth } from "compositions/examples/carousel-with-variable-width"
export { CarouselWithThumbnails as WithThumbnails } from "compositions/examples/carousel-with-thumbnails"
export { CarouselWithDialog as WithDialog } from "compositions/examples/carousel-with-dialog"
export { CarouselWithArrows as WithArrows } from "compositions/examples/carousel-with-arrows"
export { CarouselWithAutoplayDelay as WithAutoplayDelay } from "compositions/examples/carousel-with-autoplay-delay"
