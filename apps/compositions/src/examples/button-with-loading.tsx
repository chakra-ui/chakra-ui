import { Stack } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"

export const ButtonWithLoading = () => {
  return (
    <Stack direction="row" gap="4" align="center">
      <Button loading>Loading...</Button>
      <Button disabled variant="solid" colorPalette="blue">
        Click me
      </Button>
    </Stack>
  )
}
