import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Skeleton",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { SkeletonBasic as Basic } from "compositions/examples/skeleton-basic"
export { SkeletonForFeed as Feed } from "compositions/examples/skeleton-for-feed"
export { SkeletonForText as Text } from "compositions/examples/skeleton-for-text"
export { SkeletonWithChildren as WithChildren } from "compositions/examples/skeleton-with-children"
export { SkeletonWithLoaded as WithLoaded } from "compositions/examples/skeleton-with-loaded"
export { SkeletonWithStartEndColor as StartEndColor } from "compositions/examples/skeleton-with-start-end-color"
export { SkeletonWithVariants as Variants } from "compositions/examples/skeleton-with-variants"
