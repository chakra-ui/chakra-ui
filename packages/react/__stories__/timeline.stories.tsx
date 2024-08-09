import { Box } from "../src"

export default {
  title: "Components / Timeline",
  decorators: [(story: Function) => <Box padding="40px">{story()}</Box>],
}

export { TimelineBasic as Basic } from "compositions/examples/timeline-basic"
export { TimelineWithContentBefore as WithContentBefore } from "compositions/examples/timeline-with-content-before"
export { TimelineAlternating as Alternating } from "compositions/examples/timeline-alternating"
export { TimelineWithVariants as Variants } from "compositions/examples/timeline-with-variants"
export { TimelineWithSizes as Sizes } from "compositions/examples/timeline-with-sizes"
