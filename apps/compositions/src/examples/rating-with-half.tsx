import { RatingGroup } from "@chakra-ui/react"

export const RatingWithHalf = () => {
  return (
    <RatingGroup.Root allowHalf count={5} defaultValue={3.5} size="sm">
      <RatingGroup.HiddenInput />
      <RatingGroup.Control>
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingGroup.Item key={index} index={index + 1}>
            <RatingGroup.ItemIndicator />
          </RatingGroup.Item>
        ))}
      </RatingGroup.Control>
    </RatingGroup.Root>
  )
}
