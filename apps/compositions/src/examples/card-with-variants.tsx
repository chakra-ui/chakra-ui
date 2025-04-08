import { Avatar, Button, Card, For, Stack } from "@chakra-ui/react"

export const CardWithVariants = () => {
  return (
    <Stack gap="4" direction="row" wrap="wrap">
      <For each={["subtle", "outline", "elevated"]}>
        {(variant) => (
          <Card.Root width="320px" variant={variant} key={variant}>
            <Card.Body gap="2">
              <Avatar.Root size="lg" shape="rounded">
                <Avatar.Image src="https://picsum.photos/200/300" />
                <Avatar.Fallback name="Nue Camp" />
              </Avatar.Root>
              <Card.Title mb="2">Nue Camp</Card.Title>
              <Card.Description>
                This is the card body. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button variant="outline">View</Button>
              <Button>Join</Button>
            </Card.Footer>
          </Card.Root>
        )}
      </For>
    </Stack>
  )
}
