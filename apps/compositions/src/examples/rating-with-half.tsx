import { RatingGroup } from "@chakra-ui/react"

export const RatingWithHalf = () => {
  return (
    <RatingGroup.Root allowHalf count={5} defaultValue={3.5} size="sm">
      <RatingGroup.HiddenInput />
      <RatingGroup.Control />
    </RatingGroup.Root>
  )
}
