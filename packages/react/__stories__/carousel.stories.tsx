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
export { CarouselWithStore as Store } from "compositions/examples/carousel-with-store"
export { CarouselVertical as Vertical } from "compositions/examples/carousel-vertical"
export { CarouselWithFloatingArrow as FloatingArrow } from "compositions/examples/carousel-with-floating-arrow"
export { CarouselWithIndicators as Indicators } from "compositions/examples/carousel-with-indicators"
export { CarouselWithMouseDrag as MouseDrag } from "compositions/examples/carousel-with-mouse-drag"
export { CarouselWithProgressText as ProgressText } from "compositions/examples/carousel-with-progress-text"
export { CarouselSlidesPerPage as SlidesPerPage } from "compositions/examples/carousel-slides-per-page"
export { CarouselSlidesPerMove as SlidesPerMove } from "compositions/examples/carousel-slides-per-move"
export { CarouselSpacing as Spacing } from "compositions/examples/carousel-spacing"
export { CarouselVariableSize as VariableSize } from "compositions/examples/carousel-variable-size"
export { CarouselWithDialog as Dialog } from "compositions/examples/carousel-with-dialog"
export { CarouselWithThumbnails as Thumbnails } from "compositions/examples/carousel-with-thumbnails"
export { CarouselWithAutoplay as Autoplay } from "compositions/examples/carousel-with-autoplay"
export { CarouselWithImages as Images } from "compositions/examples/carousel-with-images"
export { CarouselComposition as Composition } from "compositions/examples/carousel-composition"
export { CarouselExplorerDemo as _Explorer } from "compositions/examples/carousel-explorer-demo"
