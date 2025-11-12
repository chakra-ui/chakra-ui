"use client"

import {
  Button,
  HStack,
  Tour,
  type TourStep,
  VStack,
  useTour,
} from "@chakra-ui/react"
import { useRef } from "react"
import {
  LuHeart,
  LuListMusic,
  LuPlay,
  LuShuffle,
  LuSparkles,
} from "react-icons/lu"

export const TourWithoutBackdrop = () => {
  const playRef = useRef<HTMLButtonElement | null>(null)
  const shuffleRef = useRef<HTMLButtonElement | null>(null)
  const likeRef = useRef<HTMLButtonElement | null>(null)
  const playlistRef = useRef<HTMLButtonElement | null>(null)

  const steps: TourStep[] = [
    {
      id: "play",
      type: "tooltip",
      target: () => playRef.current,
      title: "Play",
      description: "Hit play to start the track.",
      backdrop: false,
      actions: [{ label: "Next", action: "next" }],
    },
    {
      id: "shuffle",
      type: "tooltip",
      target: () => shuffleRef.current,
      title: "Shuffle",
      description: "Shuffle your playlist for variety.",
      backdrop: false,
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "like",
      type: "tooltip",
      target: () => likeRef.current,
      title: "Like",
      description: "Add this track to your favorites.",
      backdrop: false,
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "playlist",
      type: "tooltip",
      target: () => playlistRef.current,
      title: "Playlists",
      description: "View and manage your playlists.",
      backdrop: false,
      actions: [
        { label: "Back", action: "prev" },
        { label: "Finish", action: "dismiss" },
      ],
    },
  ]

  const tour = useTour({ steps })

  return (
    <VStack gap="4" alignItems="flex-start">
      <Button onClick={() => tour.start()}>
        <LuSparkles />
        Begin Tour
      </Button>

      <HStack gap={3}>
        <Button ref={playRef} variant="outline">
          <LuPlay />
          Play
        </Button>
        <Button ref={shuffleRef} variant="outline">
          <LuShuffle />
          Shuffle
        </Button>
        <Button ref={likeRef} variant="outline" colorScheme="red">
          <LuHeart />
          Like
        </Button>
        <Button ref={playlistRef} variant="outline">
          <LuListMusic />
          Playlists
        </Button>
      </HStack>

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
