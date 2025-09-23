"use client"

import { Button, Flex, Input, Popover, Text } from "@chakra-ui/react"

export const PopoverBasicExplorer = () => {
  return (
    <Popover.Root open>
      <Popover.Anchor>
        <Button size="sm" variant="outline">
          Click me
        </Button>
      </Popover.Anchor>

      <Popover.Positioner>
        <Popover.Content>
          <Popover.Arrow />

          <Popover.Header>
            <Popover.Title fontWeight="medium">Naruto Form</Popover.Title>
            <Popover.Description>
              A Japanese manga series written and illustrated by Masashi
              Kishimoto.
            </Popover.Description>
          </Popover.Header>

          <Popover.Body>
            <Text mb="3">Fill in your favorite character below:</Text>
            <Input placeholder="Your fav. character" size="sm" />
          </Popover.Body>

          <Popover.Footer>
            <Flex justify="flex-end" gap="2" w="full">
              <Popover.CloseTrigger asChild>
                <Button size="sm" variant="outline">
                  Cancel
                </Button>
              </Popover.CloseTrigger>
              <Button size="sm" colorScheme="blue">
                Save
              </Button>
            </Flex>
          </Popover.Footer>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}
