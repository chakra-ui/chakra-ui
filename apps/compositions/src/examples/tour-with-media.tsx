"use client"

import {
  Button,
  Image,
  type TourStep,
  useTour,
  useTourContext,
} from "@chakra-ui/react"
import { Tour } from "compositions/ui/tour"

export const TourWithMedia = () => {
  const tour = useTour({ steps })

  return (
    <>
      <Button size="sm" onClick={() => tour.start()}>
        See what's new
      </Button>
      <Tour tour={tour}>
        <StepImage />
      </Tour>
    </>
  )
}

const StepImage = () => {
  const { step } = useTourContext()
  const src = step?.meta?.image
  if (!src) return null
  return (
    <Image
      src={src}
      alt=""
      order="-1"
      aspectRatio="16/9"
      objectFit="cover"
      rounded="l2"
      bg="bg.muted"
      mb="2"
    />
  )
}

const steps: TourStep[] = [
  {
    id: "dashboards",
    type: "dialog",
    title: "New dashboards",
    description: "Pin any chart to a dashboard and share it with your team.",
    meta: {
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&q=80",
    },
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "themes",
    type: "dialog",
    title: "Dark mode",
    description: "Switch themes from the settings menu.",
    meta: {
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=640&q=80",
    },
    actions: [
      { label: "Previous", action: "prev" },
      { label: "Done", action: "dismiss" },
    ],
  },
]
