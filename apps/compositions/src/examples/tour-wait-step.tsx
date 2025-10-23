"use client"

import {
  Box,
  Button,
  HStack,
  Stack,
  Text,
  Tour,
  useTour,
} from "@chakra-ui/react"
import { LuHeart, LuMusic, LuShare2, LuSparkles } from "react-icons/lu"

export const TourWaitStep = () => {
  const steps = [
    {
      id: "step-1",
      type: "dialog" as const,
      title: "Interactive Music Tutorial",
      description:
        "Let's learn by doing! We'll guide you through adding a song to your favorites.",
      actions: [{ label: "Let's Go", action: "next" as const }],
    },
    {
      id: "wait-play",
      type: "wait" as const,
      title: "Play the Song",
      description: "Click the Play button to start listening.",
      effect({ next }: { next: () => void }) {
        const btn = document.querySelector<HTMLButtonElement>("#play-btn")
        const handler = () => next()
        if (btn) {
          btn.addEventListener("click", handler)
          return () => btn.removeEventListener("click", handler)
        }
        return () => {}
      },
    },
    {
      id: "step-2",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#like-btn"),
      title: "Great Choice!",
      description: "Now tap the heart to add this song to your Liked Songs.",
      placement: "top" as const,
      actions: [],
    },
    {
      id: "wait-like",
      type: "wait" as const,
      title: "Save to Favorites",
      description: "Tap the heart icon to like this song.",
      effect({ next }: { next: () => void }) {
        const btn = document.querySelector<HTMLButtonElement>("#like-btn")
        const handler = () => next()
        if (btn) {
          btn.addEventListener("click", handler)
          return () => btn.removeEventListener("click", handler)
        }
        return () => {}
      },
    },
    {
      id: "step-3",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#share-btn"),
      title: "Share the Vibes",
      description:
        "Share this track with your friends! Click the share button when you're ready.",
      placement: "top" as const,
      actions: [],
    },
    {
      id: "wait-share",
      type: "wait" as const,
      title: "Share This Track",
      description: "Click the share button to send this song to your friends.",
      effect({ next }: { next: () => void }) {
        const btn = document.querySelector<HTMLButtonElement>("#share-btn")
        const handler = () => next()
        if (btn) {
          btn.addEventListener("click", handler)
          return () => btn.removeEventListener("click", handler)
        }
        return () => {}
      },
    },
    {
      id: "final",
      type: "dialog" as const,
      title: "You're All Set!",
      description:
        "You've mastered the basics of our music player. Keep exploring and enjoy your music!",
      actions: [{ label: "Finish", action: "dismiss" as const }],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Box maxW="600px" mx="auto">
      <Button
        onClick={() => tour.start()}
        mb={6}
        width="full"
        colorPalette="purple"
      >
        <LuSparkles />
        Start Tutorial
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

      <Stack gap={6}>
        <Box
          p={6}
          borderWidth="1px"
          borderRadius="xl"
          bg="gradient-to-br from-purple.100 to-blue.100"
          _dark={{ bg: "gradient-to-br from-purple.900 to-blue.900" }}
        >
          <Stack gap={4}>
            <Box>
              <Text fontSize="2xl" fontWeight="bold">
                Midnight Dreams
              </Text>
              <Text color="gray.600" _dark={{ color: "gray.400" }}>
                The Luna Band
              </Text>
            </Box>

            <HStack justify="center" gap={6}>
              <Button
                id="play-btn"
                size="xl"
                colorPalette="purple"
                scrollMarginTop="20"
                scrollMarginBottom="20"
              >
                <LuMusic size={24} />
              </Button>
            </HStack>

            <HStack justify="center" gap={4}>
              <Button
                id="like-btn"
                variant="outline"
                size="lg"
                colorPalette="red"
                scrollMarginTop="20"
                scrollMarginBottom="20"
              >
                <LuHeart size={20} />
              </Button>
              <Button
                id="share-btn"
                variant="outline"
                size="lg"
                colorPalette="blue"
                scrollMarginTop="20"
                scrollMarginBottom="20"
              >
                <LuShare2 size={20} />
              </Button>
            </HStack>
          </Stack>
        </Box>

        <Text
          textAlign="center"
          fontSize="sm"
          color="gray.600"
          _dark={{ color: "gray.400" }}
        >
          Follow the tutorial to learn how to interact with songs
        </Text>
      </Stack>
    </Box>
  )
}
