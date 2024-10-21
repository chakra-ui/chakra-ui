import { Card, Heading, Stack } from "@chakra-ui/react"

export const CardWithSizes = () => {
  return (
    <Stack>
      <Card.Root size="sm">
        <Card.Header>
          <Heading size="md"> Card - sm</Heading>
        </Card.Header>
        <Card.Body color="fg.muted">
          This is the card body. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </Card.Body>
      </Card.Root>

      <Card.Root size="md">
        <Card.Header>
          <Heading size="md"> Card - md</Heading>
        </Card.Header>
        <Card.Body color="fg.muted">
          This is the card body. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </Card.Body>
      </Card.Root>

      <Card.Root size="lg">
        <Card.Header>
          <Heading size="md"> Card - lg</Heading>
        </Card.Header>
        <Card.Body color="fg.muted">
          This is the card body. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </Card.Body>
      </Card.Root>
    </Stack>
  )
}
