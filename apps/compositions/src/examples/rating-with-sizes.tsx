import { Stack } from "@chakra-ui/react"
import { Rating } from "compositions/ui/rating"

export const RatingWithSizes = () => {
  return (
    <Stack>
      <Rating defaultValue={3} size="xs" />
      <Rating defaultValue={3} size="sm" />
      <Rating defaultValue={3} size="md" />
      <Rating defaultValue={3} size="lg" />
    </Stack>
  )
}
