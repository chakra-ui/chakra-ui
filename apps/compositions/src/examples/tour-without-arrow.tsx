"use client"

import {
  Button,
  Card,
  CardBody,
  HStack,
  Stack,
  Text,
  Tour,
  type TourStep,
  VStack,
  useTour,
} from "@chakra-ui/react"
import { LuCalendar, LuMusic, LuSparkles, LuUsers } from "react-icons/lu"

export const TourWithoutArrow = () => {
  const tour = useTour({ steps })

  return (
    <VStack gap="2" alignItems="flex-start">
      <Button onClick={() => tour.start()}>
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

      <Stack direction={{ base: "column", md: "row" }} gap={3} w="full">
        {cards.map((card) => (
          <TourCard key={card.id} {...card} />
        ))}
      </Stack>
    </VStack>
  )
}
interface TourCardProps {
  id: string
  label: string
  icon: (typeof cards)[number]["icon"]
}

const TourCard = ({ id, label, icon: Icon }: TourCardProps) => (
  <Card.Root id={id} flex="1" variant="outline">
    <CardBody>
      <HStack>
        <Icon size={18} />
        <Text fontWeight="medium">{label}</Text>
      </HStack>
    </CardBody>
  </Card.Root>
)

const cards = [
  { id: "stage-setup", label: "Stage Setup", icon: LuMusic },
  { id: "band-members", label: "Band Members", icon: LuUsers },
  { id: "tour-dates", label: "Tour Dates", icon: LuCalendar },
]

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
