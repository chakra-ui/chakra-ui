"use client"

import {
  Box,
  Button,
  HStack,
  Stack,
  Text,
  Tour,
  type TourStep,
  VStack,
  useTour,
} from "@chakra-ui/react"
import { LuHeart, LuMusic, LuShare2, LuSparkles } from "react-icons/lu"

export const TourWaitStep = () => {
  const steps: TourStep[] = [
    {
      id: "intro",
      type: "dialog",
      title: "Welcome to Luna Music",
      description:
        "Let's take a quick tour! You'll learn how to play, like, and share your favorite tracks.",
      actions: [{ label: "Start", action: "next" }],
    },
    {
      id: "play-step",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#play-btn"),
      title: "Step 1: Play the Song",
      description:
        "Scroll down to the player section and click the Play button to start the music 🎵",
      placement: "top",
    },
    {
      id: "wait-play",
      type: "wait",
      title: "Waiting for Play",
      target: () => document.querySelector<HTMLElement>("#play-btn"),
      description: "Click the Play button to continue.",
      effect({ next }: { next: () => void }) {
        const btn = document.querySelector<HTMLButtonElement>("#play-btn")
        console.log(btn)
        const handler = () => next()
        if (btn) {
          btn.addEventListener("click", handler)
          return () => btn.removeEventListener("click", handler)
        }
        return () => {}
      },
    },
    {
      id: "like-step",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#like-btn"),
      title: "Step 2: Like the Song",
      description: "Click the heart ❤️ to save it to your Liked Songs.",
      placement: "top",
    },
    {
      id: "wait-like",
      type: "wait",
      title: "Waiting for Like",
      description: "Click the Heart button to continue.",
      effect({ next }: { next: () => void }) {
        const btn = document.querySelector<HTMLButtonElement>("#like-btn")
        const handler = () => next()
        if (btn) {
          btn.addEventListener("click", handler, { once: true })
          return () => btn.removeEventListener("click", handler)
        }
        return () => {}
      },
    },
    {
      id: "share-step",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#share-btn"),
      title: "Step 3: Share the Vibes",
      description:
        "Now click the Share icon to let your friends enjoy this track 🎧",
      placement: "top",
    },
    {
      id: "wait-share",
      type: "wait",
      title: "Waiting for Share",
      description: "Click the Share button to continue.",
      effect({ next }: { next: () => void }) {
        const btn = document.querySelector<HTMLButtonElement>("#share-btn")
        const handler = () => next()
        if (btn) {
          btn.addEventListener("click", handler, { once: true })
          return () => btn.removeEventListener("click", handler)
        }
        return () => {}
      },
    },
    {
      id: "final",
      type: "dialog",
      title: "You're All Set!",
      description:
        "You've just learned the basics of Luna Music. Time to enjoy your tunes!",
      actions: [{ label: "Finish", action: "dismiss" }],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Box maxW="1200px" mx="auto" py={10} px={6}>
      <Button onClick={() => tour.start()} mb={8} colorPalette="purple">
        <LuSparkles />
        Start Tutorial
      </Button>

      <Tour.Root tour={tour}>
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

      <VStack align="stretch" gap={12}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Recommended Tracks
          </Text>
          <Stack gap={3}>
            {["Echo Nights"].map((track) => (
              <HStack
                key={track}
                justify="space-between"
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                _hover={{ bg: "gray.50", _dark: { bg: "gray.800" } }}
              >
                <Text>{track}</Text>
                <HStack gap={2}>
                  <Button size="sm" variant="ghost" colorPalette="red">
                    <LuHeart />
                  </Button>
                  <Button size="sm" variant="ghost" colorPalette="blue">
                    <LuShare2 />
                  </Button>
                </HStack>
              </HStack>
            ))}
          </Stack>
        </Box>

        <Box
          p={8}
          borderWidth="1px"
          borderRadius="xl"
          bg="gradient-to-br from-purple.100 to-blue.100"
          _dark={{ bg: "gradient-to-br from-purple.900 to-blue.900" }}
        >
          <Stack gap={4} align="center">
            <Text fontSize="2xl" fontWeight="semibold">
              Now Playing
            </Text>

            <HStack gap={8}>
              <Button
                id="play-btn"
                size="xl"
                colorPalette="purple"
                aria-label="Play"
                onClick={() => console.log("Hello World")}
              >
                <LuMusic size={28} />
              </Button>

              <Button
                id="like-btn"
                variant="outline"
                size="lg"
                colorPalette="red"
                aria-label="Like"
              >
                <LuHeart size={24} />
              </Button>

              <Button
                id="share-btn"
                variant="outline"
                size="lg"
                colorPalette="blue"
                aria-label="Share"
              >
                <LuShare2 size={24} />
              </Button>
            </HStack>

            <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
              Play, Like, or Share your favorite songs
            </Text>
          </Stack>
        </Box>
      </VStack>
    </Box>
  )
}
