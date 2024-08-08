import { TimelineAlternating } from "compositions/examples/timeline-alternating"
import { TimelineBasic } from "compositions/examples/timeline-basic"
import { TimelineWithContentBefore } from "compositions/examples/timeline-with-content-before"
import { TimelineWithSizes } from "compositions/examples/timeline-with-sizes"
import { TimelineWithVariants } from "compositions/examples/timeline-with-variants"
import { Box } from "../src"

export default {
  title: "Components / Timeline",
  decorators: [(story: Function) => <Box padding="40px">{story()}</Box>],
}

export const Basic = () => {
  return <TimelineBasic />
}

export const WithContentBefore = () => {
  return <TimelineWithContentBefore />
}

export const Alternating = () => {
  return <TimelineAlternating />
}

export const Variants = () => {
  return <TimelineWithVariants />
}

export const Sizes = () => {
  return <TimelineWithSizes />
}
