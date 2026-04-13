import type { Meta } from "@storybook/react-vite"

export default {
  title: "Components / Carousel",
  decorators: [(Story) => <Story />],
} satisfies Meta

export { CarouselBasic as Basic } from "compositions-next/examples/carousel-basic"
