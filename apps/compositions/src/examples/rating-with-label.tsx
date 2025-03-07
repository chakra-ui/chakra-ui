import { RatingGroup } from "@chakra-ui/react"

export const RatingWithLabel = () => {
  return (
    <RatingGroup.Root count={5} defaultValue={3} size="sm" gap="4">
      <RatingGroup.HiddenInput />
      <RatingGroup.Label>Rating</RatingGroup.Label>
      <RatingGroup.Control />
    </RatingGroup.Root>
  )
}
