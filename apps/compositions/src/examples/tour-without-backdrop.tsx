"use client"

import {
  Button,
  HStack,
  Tour,
  type TourStep,
  VStack,
  useTour,
} from "@chakra-ui/react"
import {
  LuHeart,
  LuListMusic,
  LuPlay,
  LuShuffle,
  LuSparkles,
} from "react-icons/lu"

export const TourWithoutBackdrop = () => {
  const tour = useTour({ steps })

  return (
    <VStack gap="4" alignItems="flex-start">
      <Button onClick={() => tour.start()}>
        <LuSparkles />
        Begin Tour
      </Button>

      <ActionButtons />

      <Tour.Root tour={tour}>
        <Tour.Spotlight />
        <Tour.Positioner>
          <Tour.Content>
            <Tour.Arrow>
              <Tour.ArrowTip />
            </Tour.Arrow>
            <Tour.CloseTrigger />
            <Tour.ProgressText />
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

export const ActionButtons = () => {
  return (
    <HStack gap={3}>
      {buttons.map((btn) => (
        <Button
          key={btn.id}
          id={btn.id}
          variant="outline"
          colorScheme={btn.colorScheme}
        >
          {btn.icon} {btn.label}
        </Button>
      ))}
    </HStack>
  )
}

const buttons = [
  { id: "btn-play", label: "Play", icon: <LuPlay /> },
  { id: "btn-shuffle", label: "Shuffle", icon: <LuShuffle /> },
  { id: "btn-like", label: "Like", icon: <LuHeart />, colorScheme: "red" },
  { id: "btn-playlist", label: "Playlists", icon: <LuListMusic /> },
]

const steps: TourStep[] = [
  {
    id: "play",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#btn-play"),
    title: "Play",
    description: "Hit play to start the track.",
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "shuffle",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#btn-shuffle"),
    title: "Shuffle",
    description: "Shuffle your playlist for variety.",
    actions: [
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "like",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#btn-like"),
    title: "Like",
    description: "Add this track to your favorites.",
    actions: [
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "playlist",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#btn-playlist"),
    title: "Playlists",
    description: "View and manage your playlists.",
    actions: [
      { label: "Back", action: "prev" },
      { label: "Finish", action: "dismiss" },
    ],
  },
]
