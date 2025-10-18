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
export { CarouselWithIndicators as WithIndicators } from "compositions/examples/carousel-with-indicators"
export { CarouselSlidesPerPage as SlidesPerPage } from "compositions/examples/carousel-slides-per-page"
export { CarouselControlled as Controlled } from "compositions/examples/carousel-controlled"
export { CarouselSpacing as Spacing } from "compositions/examples/carousel-spacing"
