import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Rating",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { RatingBasic as Basic } from "compositions/examples/rating-basic"
export { RatingControlled as Controlled } from "compositions/examples/rating-controlled"
export { RatingEmoji as Emoji } from "compositions/examples/rating-emoji"
export { RatingInTestimonial as Testimonial } from "compositions/examples/rating-in-testimonial"
export { RatingSizeTable as Sizes } from "compositions/examples/rating-size-table"
export { RatingWithColors as Colors } from "compositions/examples/rating-with-colors"
export { RatingWithCustomIcon as CustomIcon } from "compositions/examples/rating-with-custom-icon"
export { RatingWithHalf as Half } from "compositions/examples/rating-with-half"
export { RatingWithHookForm as HookForm } from "compositions/examples/rating-with-hook-form"
export { RatingWithReadonly as ReadOnly } from "compositions/examples/rating-with-readonly"
export { RatingWithStore as Store } from "compositions/examples/rating-with-store"
