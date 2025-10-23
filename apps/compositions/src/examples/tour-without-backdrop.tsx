"use client"

import {
  Box,
  Button,
  HStack,
  IconButton,
  Stack,
  Tour,
  useTour,
} from "@chakra-ui/react"
import {
  LuHeart,
  LuListMusic,
  LuPlay,
  LuRepeat,
  LuShuffle,
  LuSkipBack,
  LuSkipForward,
  LuSparkles,
  LuVolume2,
} from "react-icons/lu"

export const TourWithoutBackdrop = () => {
  const steps = [
    {
      id: "step-1",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#play-button"),
      title: "Play Your Music",
      description:
        "Hit play to start jamming to your favorite tracks. Your music, your vibe.",
      backdrop: false,
      actions: [{ label: "Next", action: "next" as const }],
    },
    {
      id: "step-2",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#shuffle-button"),
      title: "Shuffle Mode",
      description:
        "Mix things up! Shuffle your playlist for a fresh listening experience every time.",
      backdrop: false,
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "step-3",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#like-button"),
      title: "Save Your Favorites",
      description:
        "Love a track? Tap the heart to add it to your Liked Songs collection.",
      backdrop: false,
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "step-4",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#playlist-button"),
      title: "Your Playlists",
      description:
        "Access all your curated playlists and create new ones to organize your music library.",
      backdrop: false,
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Finish", action: "dismiss" as const },
      ],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Box maxW="400px" mx="auto">
      <Button onClick={() => tour.start()} mb={6} width="full">
        <LuSparkles />
        Start Tour
      </Button>

      <Tour.RootProvider tour={tour}>
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
      </Tour.RootProvider>

      <Stack
        gap={6}
        p={6}
        borderWidth="1px"
        borderRadius="xl"
        bg="gray.50"
        _dark={{ bg: "gray.900" }}
      >
        <HStack justify="space-between">
          <IconButton
            id="shuffle-button"
            aria-label="Shuffle"
            variant="ghost"
            scrollMarginInline="10"
          >
            <LuShuffle />
          </IconButton>
          <IconButton
            id="like-button"
            aria-label="Like"
            variant="ghost"
            colorPalette="red"
            scrollMarginInline="10"
          >
            <LuHeart />
          </IconButton>
          <IconButton aria-label="Repeat" variant="ghost">
            <LuRepeat />
          </IconButton>
          <IconButton aria-label="Volume" variant="ghost">
            <LuVolume2 />
          </IconButton>
        </HStack>
        <HStack justify="center" gap={4}>
          <IconButton aria-label="Previous" size="lg" variant="outline">
            <LuSkipBack />
          </IconButton>
          <IconButton
            id="play-button"
            aria-label="Play"
            size="xl"
            colorPalette="purple"
            scrollMarginInline="10"
          >
            <LuPlay />
          </IconButton>
          <IconButton aria-label="Next" size="lg" variant="outline">
            <LuSkipForward />
          </IconButton>
        </HStack>

        <HStack justify="center">
          <Button
            id="playlist-button"
            variant="outline"
            width="full"
            scrollMarginInline="10"
          >
            <LuListMusic />
            View Playlists
          </Button>
        </HStack>
      </Stack>
    </Box>
  )
}
