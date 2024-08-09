import { Box } from "../src"

export default {
  title: "Components / Rating",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export { RatingBasic as Basic } from "compositions/examples/rating-basic"
export { RatingControlled as Controlled } from "compositions/examples/rating-controlled"
export { RatingEmoji as Emoji } from "compositions/examples/rating-emoji"
export { RatingInTestimonial as InTestimonial } from "compositions/examples/rating-in-testimonial"
export { RatingSizeTable as Sizes } from "compositions/examples/rating-size-table"
export { RatingWithColors as WithColors } from "compositions/examples/rating-with-colors"
export { RatingWithCustomIcon as WithCustomIcon } from "compositions/examples/rating-with-custom-icon"
export { RatingWithHalf as WithHalf } from "compositions/examples/rating-with-half"
export { RatingWithReadonly as ReadOnly } from "compositions/examples/rating-with-readonly"
