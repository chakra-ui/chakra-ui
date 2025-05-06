import { RatingGroup } from "@sh3yk0-ui/react"

export const RatingWithReadonly = () => {
  return (
    <RatingGroup.Root readOnly count={5} defaultValue={3} size="sm">
      <RatingGroup.HiddenInput />
      <RatingGroup.Control />
    </RatingGroup.Root>
  )
}
