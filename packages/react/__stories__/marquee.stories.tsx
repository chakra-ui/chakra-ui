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
export { MarqueeReverse as ReverseDirection } from "compositions/examples/marquee-reverse-direction"
export { MarqueeVertical as Vertical } from "compositions/examples/marquee-vertical-oriantation"
export { MarqueeSpeed as Speed } from "compositions/examples/marquee-custom-speed"
export { MarqueePauseOnInteraction as PauseOnInteraction } from "compositions/examples/marquee-pause-interactions"
export { MarqueeProgrammaticControl as ProgrammaticControl } from "compositions/examples/marquee-programatic-control"
export { MarqueeFiniteLoops as FiniteLoops } from "compositions/examples/marquee-finite-loop"
export { MarqueeWithEdges as WithEdges } from "compositions/examples/marquee-edge-gradient"
export { MarqueeMultiple as Multiple } from "compositions/examples/marquee-multiple"
export { MarqueeHoverExpand as HoverExpand } from "compositions/examples/marquee-hover-expand"
export { MarqueeParallax as Parallax } from "compositions/examples/marquee-parallax"
export { MarqueeDiagonal as Diagonal } from "compositions/examples/marquee-diagonal"
export { MarqueeNewsTicker as NewTickles } from "compositions/examples/marquee-new-tickles"
export { MarqueeVelocity as Velocity } from "compositions/examples/marquee-velocity"
