import { Button } from "compositions/ui/button"

export const ButtonWithStyleOverride = () => {
  return (
    <Button
      size="md"
      height="48px"
      width="200px"
      border="2px solid"
      borderColor="green.500"
    >
      Button
    </Button>
  )
}
