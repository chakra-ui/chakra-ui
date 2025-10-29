"use client"

import {
  Badge,
  Box,
  Button,
  HStack,
  Stack,
  Text,
  Tour,
  type TourStep,
  useTour,
} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { HiHome } from "react-icons/hi"
import { LuSettings, LuSparkles, LuUser } from "react-icons/lu"
import {
  Link,
  MemoryRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom"

const HomePage = () => {
  const homeRef = useRef<HTMLDivElement>(null)

  return (
    <Box
      ref={homeRef}
      id="home-content"
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Home Page
      </Text>
      <Text mb={4}>
        Welcome to your dashboard! This is where you'll find your recent
        activity and quick actions.
      </Text>
      <Stack gap={2}>
        <Box p={3} borderWidth="1px" borderRadius="md">
          Recent Activity #1
        </Box>
        <Box p={3} borderWidth="1px" borderRadius="md">
          Recent Activity #2
        </Box>
      </Stack>
    </Box>
  )
}

const ProfilePage = () => {
  const profileRef = useRef<HTMLDivElement>(null)

  return (
    <Box
      ref={profileRef}
      id="profile-content"
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Profile Page
      </Text>
      <Text mb={4}>Manage your personal information and preferences here.</Text>
      <Stack gap={3}>
        <HStack>
          <Text fontWeight="medium" w="100px">
            Name:
          </Text>
          <Text>John Doe</Text>
        </HStack>
        <HStack>
          <Text fontWeight="medium" w="100px">
            Email:
          </Text>
          <Text>john@example.com</Text>
        </HStack>
        <HStack>
          <Text fontWeight="medium" w="100px">
            Role:
          </Text>
          <Badge>Admin</Badge>
        </HStack>
      </Stack>
    </Box>
  )
}

const SettingsPage = () => {
  const settingsRef = useRef<HTMLDivElement>(null)

  return (
    <Box
      ref={settingsRef}
      id="settings-content"
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Settings Page
      </Text>
      <Text mb={4}>Configure your application settings and preferences.</Text>
      <Stack gap={3}>
        <HStack justify="space-between">
          <Text>Dark Mode</Text>
          <Button size="sm" variant="outline">
            Toggle
          </Button>
        </HStack>
        <HStack justify="space-between">
          <Text>Notifications</Text>
          <Button size="sm" variant="outline">
            Configure
          </Button>
        </HStack>
        <HStack justify="space-between">
          <Text>Privacy</Text>
          <Button size="sm" variant="outline">
            Manage
          </Button>
        </HStack>
      </Stack>
    </Box>
  )
}

const TourContent = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isNavigating, setIsNavigating] = useState(false)

  const steps: TourStep[] = [
    {
      id: "welcome",
      type: "dialog",
      title: "Welcome to the Multi-Page Tour!",
      description:
        "This tour will guide you through different pages of the application. The tour state persists as you navigate between pages.",
      actions: [{ label: "Start Tour", action: "next" }],
    },
    {
      id: "home-nav",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#nav-home"),
      title: "Home Navigation",
      description: "Click here to go to your home page.",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "home-content",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#home-content"),
      title: "Your Dashboard",
      description:
        "This is your main dashboard where you can see recent activities and important information.",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "profile-nav",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#nav-profile"),
      title: "Profile Navigation",
      description: "Now let's navigate to your profile page.",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "profile-content",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#profile-content"),
      title: "Your Profile",
      description:
        "Here you can view and edit your personal information. Notice how the tour persisted across page navigation!",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "settings-nav",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#nav-settings"),
      title: "Settings Navigation",
      description: "Finally, let's check out the settings page.",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "settings-content",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#settings-content"),
      title: "Application Settings",
      description:
        "Configure all your preferences here. You've completed the multi-page tour!",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Finish", action: "dismiss" },
      ],
    },
  ]

  const tour = useTour({ steps })

  useEffect(() => {
    if (!tour.step || isNavigating) return

    const stepToPageMap: Record<string, string> = {
      welcome: "/",
      "home-nav": "/",
      "home-content": "/",
      "profile-nav": "/profile",
      "profile-content": "/profile",
      "settings-nav": "/settings",
      "settings-content": "/settings",
    }

    const targetPath = stepToPageMap[tour.step.id]
    if (targetPath && location.pathname !== targetPath) {
      setIsNavigating(true)
      navigate(targetPath)
      setTimeout(() => {
        setIsNavigating(false)
      }, 100)
    }
  }, [tour.step, location.pathname, navigate, isNavigating])

  const isActive = (path: string) => location.pathname === path

  return (
    <Box maxW="800px" mx="auto">
      <Stack gap={6}>
        <Box>
          <Button
            onClick={() => tour.start()}
            width="full"
            colorPalette="teal"
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
              bg="blue.50"
              _dark={{ bg: "blue.950" }}
            >
              <HStack justify="space-between" mb={2}>
                <Text fontSize="sm" fontWeight="medium">
                  Tour Progress
                </Text>
                <Badge colorPalette="teal">
                  Step {tour.stepIndex + 1} of {tour.totalSteps}
                </Badge>
              </HStack>
              <Text
                fontSize="xs"
                color="gray.600"
                _dark={{ color: "gray.400" }}
              >
                Current page: {location.pathname}
              </Text>
            </Box>
          )}
        </Box>

        <Box
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          bg="gray.50"
          _dark={{ bg: "gray.900" }}
        >
          <Text fontSize="sm" fontWeight="medium" mb={3}>
            Navigation
          </Text>
          <HStack gap={2}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                id="nav-home"
                size="sm"
                variant={isActive("/") ? "solid" : "outline"}
                colorPalette={isActive("/") ? "teal" : undefined}
              >
                <HiHome />
                Home
              </Button>
            </Link>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <Button
                id="nav-profile"
                size="sm"
                variant={isActive("/profile") ? "solid" : "outline"}
                colorPalette={isActive("/profile") ? "teal" : undefined}
              >
                <LuUser />
                Profile
              </Button>
            </Link>
            <Link to="/settings" style={{ textDecoration: "none" }}>
              <Button
                id="nav-settings"
                size="sm"
                variant={isActive("/settings") ? "solid" : "outline"}
                colorPalette={isActive("/settings") ? "teal" : undefined}
              >
                <LuSettings />
                Settings
              </Button>
            </Link>
          </HStack>
        </Box>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Stack>

      <Tour.Root tour={tour}>
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
      </Tour.Root>
    </Box>
  )
}

export const TourWithRouting = () => {
  return (
    <MemoryRouter initialEntries={["/"]} initialIndex={0}>
      <TourContent />
    </MemoryRouter>
  )
}
