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
export { CarouselWithAutoplay as Autoplay } from "compositions/examples/carousel-with-autoplay"
export { CarouselWithAutoplayDelay as AutoplayDelay } from "compositions/examples/carousel-with-autoplay-delay"
export { CarouselWithDialog as Dialog } from "compositions/examples/carousel-with-dialog"
export { CarouselWithFloatingArrow as FloatingArrow } from "compositions/examples/carousel-with-floating-arrow"
export { CarouselWithIndicators as Indicators } from "compositions/examples/carousel-with-indicators"
export { CarouselWithLoop as Loop } from "compositions/examples/carousel-with-loop"
export { CarouselWithMouseDrag as MouseDrag } from "compositions/examples/carousel-with-mouse-drag"
export { CarouselWithOrientation as Orientation } from "compositions/examples/carousel-with-orientation"
export { CarouselWithStore as Store } from "compositions/examples/carousel-with-store"
export { CarouselWithThumbnails as Thumbnails } from "compositions/examples/carousel-with-thumbnails"
export { CarouselWithVariableWidth as VariableWidth } from "compositions/examples/carousel-with-variable-width"
