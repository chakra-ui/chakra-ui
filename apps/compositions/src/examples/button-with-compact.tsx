import { Button, Stack } from "@chakra-ui/react"

export const ButtonWithCompact = () => {
  return (
    <Stack direction="row" spacing="4">
      <Button isCompact>Compact Default</Button>
      <Button isCompact colorScheme="blue">
        Compact Blue
      </Button>
      <Button isCompact variant="outline">
        Compact Outline
      </Button>
      <Button isCompact size="sm" colorScheme="green">
        Compact Small
      </Button>
    </Stack>
  )
}
