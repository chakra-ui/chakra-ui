import { Rating } from "compositions/ui/rating"
import { IoHeart } from "react-icons/io5"

export const RatingWithCustomIcon = () => {
  return (
    <Rating
      colorPalette="red"
      icon={<IoHeart />}
      allowHalf
      count={5}
      defaultValue={3.5}
    />
  )
}
