import { Avatar, Button, Card, Heading } from "@chakra-ui/react"

export const CardExplorerDemo = () => {
  return (
    <Card.Root width="320px" borderWidth="1px" rounded="md">
      <Card.Header borderBottomWidth="1px" px="4" py="3">
        <Heading size="sm">Profile</Heading>
      </Card.Header>

      <Card.Body gap="3" px="4" pt="4" pb="4">
        <Avatar.Root size="lg" shape="rounded">
          <Avatar.Image src="https://picsum.photos/200/300" />
          <Avatar.Fallback name="Nue Camp" />
        </Avatar.Root>
        <Card.Title>Nue Camp</Card.Title>
        <Card.Description fontSize="sm" color="gray.600">
          This is the card body. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
        </Card.Description>
      </Card.Body>

      <Card.Footer justifyContent="flex-end" gap="2" px="4" pb="4">
        <Button variant="outline" size="sm">
          View
        </Button>
        <Button size="sm">Join</Button>
      </Card.Footer>
    </Card.Root>
  )
}
