"use client"

import {
  Button,
  For,
  Heading,
  Popover,
  Portal,
  Textarea,
  chakra,
  useSlotRecipe,
} from "@chakra-ui/react"
import { PlaygroundTable } from "compositions/lib/playground-table"
import { HiChat } from "react-icons/hi"

export const PopoverSizeTable = () => {
  const recipe = useSlotRecipe({ key: "popover" })
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <For each={recipe.variantMap.size}>{(v) => <td>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <tr>
          <For each={recipe.variantMap.size}>
            {(v) => (
              <chakra.td key={v} minW="400px">
                <Popover.Root size={v} open>
                  <Popover.Trigger asChild>
                    <Button size={v} variant="solid">
                      <HiChat />
                      Add comment
                    </Button>
                  </Popover.Trigger>
                  <Portal>
                    <Popover.Positioner>
                      <Popover.Content>
                        <Popover.Arrow />
                        <Popover.CloseTrigger />
                        <Popover.Header>
                          <Heading size="sm">Confirmation!</Heading>
                        </Popover.Header>
                        <Popover.Body>
                          <Textarea
                            size={v}
                            placeholder="Type your comment here"
                          />
                        </Popover.Body>
                        <Popover.Footer gap="2">
                          <Button size={v} variant="solid">
                            Submit
                          </Button>
                          <Button size={v}>Cancel</Button>
                        </Popover.Footer>
                      </Popover.Content>
                    </Popover.Positioner>
                  </Portal>
                </Popover.Root>
              </chakra.td>
            )}
          </For>
        </tr>
      </tbody>
    </PlaygroundTable>
  )
}
