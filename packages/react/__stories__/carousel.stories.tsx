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

// export { CarouselBasic as Basic } from "compositions/examples/carousel-basic"
// export { CarouselWithIndicators as WithIndicators } from "compositions/examples/carousel-with-indicators"
// export { CarouselWithAutoplay as WithAutoplay } from "compositions/examples/carousel-with-autoplay"
// export { CarouselSizeTable as Sizes } from "compositions/examples/carousel-size-table"
// export { CarouselVariantTable as Variants } from "compositions/examples/carousel-variant-table"
