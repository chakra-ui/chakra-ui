import { Button, ButtonGroup } from "@chakra-ui/react"

export const ButtonWithSpinnerPlacement = () => {
  return (
    <ButtonGroup colorPalette="teal">
      <Button loading loadingText="Loading" spinnerPlacement="start">
        Submit
      </Button>
      <Button loading loadingText="Loading" spinnerPlacement="end">
        Continue
      </Button>
    </ButtonGroup>
  )
}
