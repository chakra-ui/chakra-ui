import { Button, Stack } from "@chakra-ui/react"

export const ButtonWithCompact = () => {
  return (
    <Stack direction="row" spacing="4">
      <Button compact>Compact Default</Button>
      <Button compact colorScheme="blue">
        Compact Blue
      </Button>
      <Button compact variant="outline">
        Compact Outline
      </Button>
      <Button compact size="sm" colorScheme="green">
        Compact Small
      </Button>
    </Stack>
  )
}
