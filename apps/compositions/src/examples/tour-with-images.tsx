"use client"

import {
  Button,
  HStack,
  Image,
  Tour,
  type TourStep,
  VStack,
  useTour,
} from "@chakra-ui/react"
import { LuSparkles } from "react-icons/lu"

export const TourWithImages = () => {
  const tour = useTour({ steps })

  return (
    <VStack gap="4" alignItems="flex-start">
      <Button onClick={() => tour.start()} colorScheme="orange">
        <LuSparkles />
        Begin Coffee Tour
      </Button>

      <CoffeeButtons />

      <Tour.Root tour={tour}>
        <Tour.Backdrop />
        <Tour.Spotlight />
        <Tour.Positioner>
          <Tour.Content>
            <Tour.Arrow>
              <Tour.ArrowTip />
            </Tour.Arrow>

            <Tour.CloseTrigger />
            <Tour.ProgressText />

            <Tour.Context>
              {(ctx) => {
                const step = ctx.step as TourStepWithImage
                if (!step) return null

                return (
                  <VStack gap={3} mb={3} w="100%" alignItems="center">
                    <Image
                      src={step.meta.image}
                      alt={step.description}
                      width="100%"
                      h="240px"
                      borderRadius="md"
                      userSelect="none"
                      draggable={false}
                    />
                  </VStack>
                )
              }}
            </Tour.Context>

            <Tour.Title />
            <Tour.Description />

            <Tour.Control justifyContent="flex-end" gap="4">
              <Tour.ActionTriggers />
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Tour.Root>
    </VStack>
  )
}

export const CoffeeButtons = () => {
  return (
    <HStack gap={3}>
      {buttons.map((btn) => (
        <Button key={btn.id} id={btn.id} variant="outline">
          {btn.label}
        </Button>
      ))}
    </HStack>
  )
}

const buttons = [
  { id: "btn-espresso", label: "Espresso" },
  { id: "btn-latte", label: "Latte" },
  { id: "btn-cappuccino", label: "Cappuccino" },
  { id: "btn-mocha", label: "Mocha" },
]

const steps: TourStepWithImage[] = [
  {
    id: "espresso",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#btn-espresso"),
    title: "Espresso",
    description: "Strong and bold, the foundation of all coffee drinks.",
    meta: {
      image:
        "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=900&auto=format&fit=crop&q=60",
    },
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "latte",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#btn-latte"),
    title: "Latte",
    description: "Smooth and creamy, perfect with steamed milk.",
    meta: {
      image:
        "https://images.unsplash.com/photo-1582152747136-af63c112fce5?w=900&auto=format&fit=crop&q=60",
    },
    actions: [
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "cappuccino",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#btn-cappuccino"),
    title: "Cappuccino",
    description: "A balanced mix of espresso, milk, and foam.",
    meta: {
      image:
        "https://plus.unsplash.com/premium_photo-1674327105076-36c4419864cf?w=900&auto=format&fit=crop&q=60",
    },
    actions: [
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "mocha",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#btn-mocha"),
    title: "Mocha",
    description: "Chocolatey, sweet, and delicious, coffee with cocoa.",
    meta: {
      image:
        "https://images.unsplash.com/photo-1618576230663-9714aecfb99a?w=900&auto=format&fit=crop&q=60",
    },
    actions: [
      { label: "Back", action: "prev" },
      { label: "Finish", action: "dismiss" },
    ],
  },
]

interface TourStepWithImage extends TourStep {
  meta: {
    image: string
  }
}
