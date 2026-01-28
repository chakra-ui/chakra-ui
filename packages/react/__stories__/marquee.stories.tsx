import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Components / Marquee",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { MarqueeAutoFill as AutoFill } from "compositions/examples/marquee-auto-fill"
export { MarqueeReverseDirection as ReverseDirection } from "compositions/examples/marquee-reverse-direction"
export { MarqueeVerticalAnimation as Vertical } from "compositions/examples/marquee-vertical-animation"
export { MarqueeWithSpeed as WithSpeed } from "compositions/examples/marquee-with-speed"
export { MarqueePauseInteractions as PauseOnInteraction } from "compositions/examples/marquee-pause-interactions"
export { MarqueeWithStore as Store } from "compositions/examples/marquee-with-store"
export { MarqueeFiniteLoop as FiniteLoops } from "compositions/examples/marquee-finite-loop"
export { MarqueeEdgeGradient as Edges } from "compositions/examples/marquee-edge-gradient"
export { MarqueeMultiple as Multiple } from "compositions/examples/marquee-multiple"
export { MarqueeDiagonal as Diagonal } from "compositions/examples/marquee-diagonal"
export { MarqueeNewsTicker as NewsTicker } from "compositions/examples/marquee-news-ticker"
export { MarqueeWithTestimonials as Testimonials } from "compositions/examples/marquee-with-testimonials"
