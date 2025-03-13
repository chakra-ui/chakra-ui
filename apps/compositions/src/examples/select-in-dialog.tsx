"use client"

import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Select,
  createListCollection,
} from "@chakra-ui/react"
import { useRef } from "react"

export const SelectInDialog = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content ref={contentRef}>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
            <Dialog.Header>
              <Dialog.Title>Select in Dialog</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Select.Root collection={frameworks} size="sm">
                <Select.HiddenSelect />
                <Select.Label>Select framework</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Select framework" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal container={contentRef}>
                  <Select.Positioner>
                    <Select.Content>
                      {frameworks.items.map((item) => (
                        <Select.Item item={item} key={item.value}>
                          {item.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </Dialog.Body>
            <Dialog.Footer />
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
})
