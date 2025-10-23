"use client"

import { Box, Button, HStack, Stack, Tour, useTour } from "@chakra-ui/react"

export const TourWithVariants = () => {
  const steps = [
    {
      id: "step-1",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#variant-1"),
      title: "Solid Variant",
      description:
        "This tour step uses the solid variant for a bold appearance.",
      actions: [{ label: "Next", action: "next" as const }],
    },
    {
      id: "step-2",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#variant-2"),
      title: "Outline Variant",
      description:
        "This tour step uses the outline variant for a subtle border style.",
      actions: [
        { label: "Previous", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "step-3",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#variant-3"),
      title: "Ghost Variant",
      description: "This tour step uses the ghost variant for a minimal look.",
      actions: [
        { label: "Previous", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "step-4",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#variant-4"),
      title: "Subtle Variant",
      description:
        "This tour step uses the subtle variant for a muted background.",
      actions: [
        { label: "Previous", action: "prev" as const },
        { label: "Finish", action: "dismiss" as const },
      ],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Box p={6}>
      <Button onClick={() => tour.start()} mb={4}>
        Start Tour
      </Button>
      <Stack gap={4} mb={8}>
        <HStack>
          <Button id="variant-1" colorPalette="blue">
            Solid Button
          </Button>
          <Button id="variant-2" colorPalette="green">
            Outline Button
          </Button>
        </HStack>
        <HStack>
          <Button id="variant-3" colorPalette="purple">
            Ghost Button
          </Button>
          <Button id="variant-4" colorPalette="orange">
            Subtle Button
          </Button>
        </HStack>
      </Stack>

      <Tour.Root tour={tour} colorPalette="purple">
        <Tour.Backdrop />
        <Tour.Spotlight />
        <Tour.Positioner>
          <Tour.Content>
            <Tour.Arrow>
              <Tour.ArrowTip />
            </Tour.Arrow>
            <Tour.CloseTrigger />
            <Tour.Title />
            <Tour.Description />
            <Tour.Control>
              <Tour.ProgressText />
              <Tour.ActionTriggers />
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Tour.Root>
    </Box>
  )
}
