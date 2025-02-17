import { RatingGroup } from "@chakra-ui/react"
import { IoHeart } from "react-icons/io5"

export const RatingWithCustomIcon = () => {
  return (
    <RatingGroup.Root count={5} defaultValue={4} colorPalette="red">
      <RatingGroup.HiddenInput />
      <RatingGroup.Control>
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingGroup.Item key={index} index={index + 1}>
            <RatingGroup.ItemIndicator icon={<IoHeart />} />
          </RatingGroup.Item>
        ))}
      </RatingGroup.Control>
    </RatingGroup.Root>
  )
}
