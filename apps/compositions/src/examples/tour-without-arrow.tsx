"use client"

import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Stack,
  Text,
  Tour,
  type TourStep,
  useTour,
} from "@chakra-ui/react"
import { LuCalendar, LuMusic, LuSparkles, LuUsers } from "react-icons/lu"

export const TourWithoutArrow = () => {
  const steps: TourStep[] = [
    {
      id: "step-1",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#stage-setup"),
      title: "Stage Setup",
      description:
        "Configure your stage layout, lighting, and sound check settings.",
      arrow: false,
      actions: [{ label: "Next", action: "next" }],
    },
    {
      id: "step-2",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#band-members"),
      title: "Band Members",
      description: "Add your bandmates and manage their roles in one place.",
      arrow: false,
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "step-3",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#tour-dates"),
      title: "Tour Dates",
      description: "Plan shows and keep track of your schedule.",
      arrow: false,
      actions: [
        { label: "Back", action: "prev" },
        { label: "Finish", action: "dismiss" },
      ],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Box>
      <Button onClick={() => tour.start()} mb={4} size="sm">
        <LuSparkles />
        Begin Tour
      </Button>

      <Tour.Root tour={tour}>
        <Tour.Backdrop />
        <Tour.Spotlight />
        <Tour.Positioner>
          <Tour.Content>
            <Tour.CloseTrigger />
            <Tour.Title />
            <Tour.Description />
            <Tour.Control justifyContent="flex-end" gap="2">
              <Tour.ActionTriggers />
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Tour.Root>

      <Stack direction={{ base: "column", md: "row" }} gap={3}>
        <Card.Root id="stage-setup" flex="1" variant="outline">
          <CardBody>
            <HStack>
              <LuMusic size={18} />
              <Text fontWeight="medium">Stage Setup</Text>
            </HStack>
          </CardBody>
        </Card.Root>

        <Card.Root id="band-members" flex="1" variant="outline">
          <CardBody>
            <HStack>
              <LuUsers size={18} />
              <Text fontWeight="medium">Band Members</Text>
            </HStack>
          </CardBody>
        </Card.Root>

        <Card.Root id="tour-dates" flex="1" variant="outline">
          <CardBody>
            <HStack>
              <LuCalendar size={18} />
              <Text fontWeight="medium">Tour Dates</Text>
            </HStack>
          </CardBody>
        </Card.Root>
      </Stack>
    </Box>
  )
}
