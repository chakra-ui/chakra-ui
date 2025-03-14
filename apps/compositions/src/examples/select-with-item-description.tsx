"use client"

import {
  Portal,
  Select,
  Span,
  Stack,
  createListCollection,
} from "@chakra-ui/react"

export const SelectWithItemDescription = () => {
  return (
    <Select.Root
      collection={frameworks}
      size="sm"
      width="320px"
      defaultValue={["pro"]}
    >
      <Select.HiddenSelect />
      <Select.Label>Select plan</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select plan" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {frameworks.items.map((framework) => (
              <Select.Item item={framework} key={framework.value}>
                <Stack gap="0">
                  <Select.ItemText>{framework.label}</Select.ItemText>
                  <Span color="fg.muted" textStyle="xs">
                    {framework.description}
                  </Span>
                </Stack>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

const frameworks = createListCollection({
  items: [
    {
      label: "Basic Plan",
      value: "basic",
      description: "$9/month - Perfect for small projects",
    },
    {
      label: "Pro Plan",
      value: "pro",
      description: "$29/month - Advanced features",
    },
    {
      label: "Business Plan",
      value: "business",
      description: "$99/month - Enterprise-grade solutions",
    },
    {
      label: "Enterprise Plan",
      value: "enterprise",
      description: "Custom pricing - Tailored solutions",
    },
  ],
})
