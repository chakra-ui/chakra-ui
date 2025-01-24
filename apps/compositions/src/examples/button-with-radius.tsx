import { Button, ButtonGroup, Stack, Text } from "@chakra-ui/react"

export const ButtonWithRadius = () => {
  return (
    <Stack gap="8">
      <Stack>
        <Text textStyle="sm">Semantic Radius</Text>
        <ButtonGroup variant="subtle">
          <Button rounded="l1">Rounded l1</Button>
          <Button rounded="l2">Rounded l2</Button>
          <Button rounded="l3">Rounded l3</Button>
        </ButtonGroup>
      </Stack>

      <Stack>
        <Text textStyle="sm">Core Radius</Text>
        <ButtonGroup variant="subtle">
          <Button rounded="sm">Rounded sm</Button>
          <Button rounded="md">Rounded md</Button>
          <Button rounded="lg">Rounded lg</Button>
          <Button rounded="xl">Rounded xl</Button>
          <Button rounded="2xl">Rounded 2xl</Button>
          <Button rounded="full">Rounded full</Button>
        </ButtonGroup>
      </Stack>
    </Stack>
  )
}
