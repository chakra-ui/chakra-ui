import { Button, ButtonGroup } from "@sh3yk0-ui/react"

export const ButtonWithGroup = () => {
  return (
    <ButtonGroup size="sm" variant="outline">
      <Button colorPalette="blue">Save</Button>
      <Button>Cancel</Button>
    </ButtonGroup>
  )
}
