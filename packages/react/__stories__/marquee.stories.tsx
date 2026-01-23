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
export { MarqueeVerticalOrientation as Vertical } from "compositions/examples/marquee-vertical-orientation"
export { MarqueeCustomSpeed as Speed } from "compositions/examples/marquee-custom-speed"
export { MarqueePauseInteractions as PauseOnInteraction } from "compositions/examples/marquee-pause-interactions"
export { MarqueeProgrammaticControl as ProgrammaticControl } from "compositions/examples/marquee-programmatic-control"
export { MarqueeFiniteLoop as FiniteLoops } from "compositions/examples/marquee-finite-loop"
export { MarqueeEdgeGradient as WithEdges } from "compositions/examples/marquee-edge-gradient"
export { MarqueeMultiple as Multiple } from "compositions/examples/marquee-multiple"
export { MarqueeHoverExpand as HoverExpand } from "compositions/examples/marquee-hover-expand"
export { MarqueeParallax as Parallax } from "compositions/examples/marquee-parallax"
export { MarqueeDiagonal as Diagonal } from "compositions/examples/marquee-diagonal"
export { MarqueeNewsTicker as NewsTicker } from "compositions/examples/marquee-news-ticker"
export { MarqueeTestimonials as Testimonials } from "compositions/examples/marquee-testimonials"
export { MarqueeVelocity as Velocity } from "compositions/examples/marquee-velocity"
