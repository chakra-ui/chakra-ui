import { useInterval } from "@chakra-ui/hooks"
import { useState } from "react"
import { HiChat, HiX } from "react-icons/hi"
import {
  Box,
  Button,
  For,
  Heading,
  IconButton,
  Popover,
  Textarea,
  chakra,
  useSlotRecipe,
} from "../src"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Popover",
  decorators: [(story: Function) => <Box padding="100px">{story()}</Box>],
}

export const Basic = () => {
  return (
    <Popover.Root defaultOpen closeOnBlur={false}>
      <Popover.Trigger asChild>
        <Button variant="solid">
          <HiChat />
          Add comment
        </Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Arrow />

          <Popover.CloseTrigger asChild>
            <IconButton aria-label="Close" variant="ghost">
              <HiX />
            </IconButton>
          </Popover.CloseTrigger>

          <Popover.Header>
            <Heading size="sm">Confirmation!</Heading>
          </Popover.Header>

          <Popover.Body>
            <Textarea placeholder="Type your comment here" />
          </Popover.Body>

          <Popover.Footer gap="2">
            <Button variant="solid">Submit</Button>
            <Button>Cancel</Button>
          </Popover.Footer>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}

export const Sizes = () => {
  const recipe = useSlotRecipe("Popover")
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
                  <Popover.Positioner>
                    <Popover.Content>
                      <Popover.Arrow />
                      <Popover.CloseTrigger asChild>
                        <IconButton aria-label="Close" variant="ghost" size={v}>
                          <HiX />
                        </IconButton>
                      </Popover.CloseTrigger>

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
                </Popover.Root>
              </chakra.td>
            )}
          </For>
        </tr>
      </tbody>
    </PlaygroundTable>
  )
}

const Interval = () => {
  const [value, setValue] = useState(0)
  useInterval(() => setValue((v) => v + 1), 1000)
  return (
    <span style={{ fontWeight: "bold", color: "tomato", padding: 4 }}>
      {value}
    </span>
  )
}

export function WithLazyPopover() {
  return (
    <Popover.Root lazyMount>
      <Popover.Trigger asChild>
        <Button variant="solid">Popover Target</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Body>
            Are you sure you want to continue with your action?
            <p>
              Timer: <Interval />
            </p>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}
