"use client"

import {
  Badge,
  Box,
  Button,
  HStack,
  Stack,
  Text,
  Tour,
  useTour,
} from "@chakra-ui/react"
import { HiHome } from "react-icons/hi"
import { LuSearch, LuSparkles, LuUser } from "react-icons/lu"

export const TourControlled = () => {
  const steps = [
    {
      id: "step-1",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#home-tab"),
      title: "Your Home Feed",
      description:
        "Discover new music, trending playlists, and personalized recommendations just for you.",
      actions: [{ label: "Next", action: "next" as const }],
    },
    {
      id: "step-2",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#search-tab"),
      title: "Search Everything",
      description:
        "Find any song, artist, album, or playlist in seconds. Your music library awaits.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "step-3",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#profile-tab"),
      title: "Your Profile",
      description:
        "Manage your playlists, liked songs, and listening history all in one place.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Finish", action: "dismiss" as const },
      ],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Box maxW="500px" mx="auto">
      <Stack gap={6}>
        <Box>
          <Button
            onClick={() => tour.start()}
            width="full"
            colorPalette="purple"
            mb={3}
          >
            <LuSparkles />
            Start Tour
          </Button>

          {tour.step && (
            <Box
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              bg="gray.50"
              _dark={{ bg: "gray.900" }}
            >
              <HStack justify="space-between" mb={2}>
                <Text fontSize="sm" fontWeight="medium">
                  Tour Progress
                </Text>
                <Badge colorPalette="purple">
                  {tour.stepIndex + 1} of {tour.totalSteps}
                </Badge>
              </HStack>
              <HStack gap={2}>
                <Button
                  size="sm"
                  onClick={() => tour.prev()}
                  disabled={!tour.hasPrevStep}
                  flex="1"
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  onClick={() => tour.next()}
                  disabled={!tour.hasNextStep}
                  flex="1"
                  colorPalette="purple"
                >
                  Next
                </Button>
              </HStack>
            </Box>
          )}
        </Box>

        <Box
          borderWidth="1px"
          borderRadius="xl"
          p={6}
          bg="gray.50"
          _dark={{ bg: "gray.900" }}
        >
          <Text
            fontSize="sm"
            color="gray.600"
            _dark={{ color: "gray.400" }}
            mb={4}
          >
            Main Navigation
          </Text>
          <Stack gap={3}>
            <Button
              id="home-tab"
              variant="outline"
              size="lg"
              justifyContent="flex-start"
              scrollMarginTop="10"
            >
              <HiHome />
              Home
            </Button>
            <Button
              id="search-tab"
              variant="outline"
              size="lg"
              justifyContent="flex-start"
              scrollMarginTop="10"
            >
              <LuSearch />
              Search
            </Button>
            <Button
              id="profile-tab"
              variant="outline"
              size="lg"
              justifyContent="flex-start"
              scrollMarginTop="10"
            >
              <LuUser />
              Profile
            </Button>
          </Stack>
        </Box>
      </Stack>

      <Tour.RootProvider tour={tour}>
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
      </Tour.RootProvider>
    </Box>
  )
}
