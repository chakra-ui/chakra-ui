import { Button, ButtonGroup } from "@chakra-ui/react"

export const ButtonWithGroup = () => {
  return (
    <ButtonGroup size="sm" variant="outline">
      <Button colorPalette="blue">Save</Button>
      <Button>Cancel</Button>
    </ButtonGroup>
  )
}
