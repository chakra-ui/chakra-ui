import { RatingGroup } from "@chakra-ui/react"

export const RatingWithReadonly = () => {
  return (
    <RatingGroup.Root readOnly count={5} defaultValue={3} size="sm">
      <RatingGroup.HiddenInput />
      <RatingGroup.Control />
    </RatingGroup.Root>
  )
}
