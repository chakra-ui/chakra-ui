import { Card, For, Group, Heading, Stack, Text } from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"
import { Button } from "compositions/ui/button"

export const CardWithVariants = () => {
  return (
    <Stack gap="4" direction="row" wrap="wrap">
      <For each={["subtle", "outline", "elevated"]}>
        {(variant) => (
          <Card.Root width="320px" variant={variant} key={variant}>
            <Card.Body>
              <Avatar
                src="https://picsum.photos/200/300"
                name="Nue Camp"
                size="lg"
                shape="rounded"
              />
              <Heading size="lg" mt="4" mb="2">
                Nue Camp
              </Heading>
              <Text color="fg.subtle">
                This is the card body. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </Text>
            </Card.Body>
            <Card.Footer>
              <Group justify="flex-end" width="full">
                <Button variant="outline">View</Button>
                <Button>Join</Button>
              </Group>
            </Card.Footer>
          </Card.Root>
        )}
      </For>
    </Stack>
  )
}
