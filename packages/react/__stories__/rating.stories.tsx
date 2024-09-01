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
export { RatingInTestimonial as InTestimonial } from "compositions/examples/rating-in-testimonial"
export { RatingSizeTable as Sizes } from "compositions/examples/rating-size-table"
export { RatingWithColors as WithColors } from "compositions/examples/rating-with-colors"
export { RatingWithCustomIcon as WithCustomIcon } from "compositions/examples/rating-with-custom-icon"
export { RatingWithHalf as WithHalf } from "compositions/examples/rating-with-half"
export { RatingWithHookForm as WithHookForm } from "compositions/examples/rating-with-hook-form"
export { RatingWithReadonly as ReadOnly } from "compositions/examples/rating-with-readonly"
