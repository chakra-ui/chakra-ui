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
import { useRef } from "react"
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
      borderRadius="xl"
      bg="bg.surface"
      borderColor="border"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4} color="fg">
        Home Page
      </Text>
      <Text mb={4} color="fg.muted">
        Welcome to your dashboard! This is where you'll find your recent
        activity and quick actions.
      </Text>
      <Stack gap={2}>
        <Box p={3} borderWidth="1px" borderRadius="md" borderColor="border">
          Recent Activity #1
        </Box>
        <Box p={3} borderWidth="1px" borderRadius="md" borderColor="border">
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
      borderRadius="xl"
      bg="bg.surface"
      borderColor="border"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4} color="fg">
        Profile Page
      </Text>
      <Text mb={4} color="fg.muted">
        Manage your personal information and preferences here.
      </Text>
      <Stack gap={3}>
        <HStack>
          <Text fontWeight="medium" w="100px" color="fg">
            Name:
          </Text>
          <Text color="fg.subtle">John Doe</Text>
        </HStack>
        <HStack>
          <Text fontWeight="medium" w="100px" color="fg">
            Email:
          </Text>
          <Text color="fg.subtle">john@example.com</Text>
        </HStack>
        <HStack>
          <Text fontWeight="medium" w="100px" color="fg">
            Role:
          </Text>
          <Badge colorPalette="accent">Admin</Badge>
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
      borderRadius="xl"
      bg="bg.surface"
      borderColor="border"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4} color="fg">
        Settings Page
      </Text>
      <Text mb={4} color="fg.muted">
        Configure your application settings and preferences.
      </Text>
      <Stack gap={3}>
        <HStack justify="space-between">
          <Text color="fg">Dark Mode</Text>
          <Button size="sm" variant="outline" colorPalette="accent">
            Toggle
          </Button>
        </HStack>
        <HStack justify="space-between">
          <Text color="fg">Notifications</Text>
          <Button size="sm" variant="outline" colorPalette="accent">
            Configure
          </Button>
        </HStack>
        <HStack justify="space-between">
          <Text color="fg">Privacy</Text>
          <Button size="sm" variant="outline" colorPalette="accent">
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

  const stepToPageMap: Record<string, string> = {
    welcome: "/",
    "home-nav": "/",
    "home-content": "/",
    "profile-nav": "/profile",
    "profile-content": "/profile",
    "settings-nav": "/settings",
    "settings-content": "/settings",
  }

  const makeEffect =
    (stepId: string) =>
    ({ show }: { show: () => void }) => {
      const targetPath = stepToPageMap[stepId]
      if (targetPath && location.pathname !== targetPath) {
        navigate(targetPath)
      }
      show()
      return () => {}
    }

  const steps: TourStep[] = [
    {
      id: "welcome",
      type: "dialog",
      title: "Welcome to the Multi-Page Tour!",
      description:
        "This tour will guide you through different pages of the application. The tour state persists as you navigate between pages.",
      actions: [{ label: "Start Tour", action: "next" }],
      effect: makeEffect("welcome"),
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
      effect: makeEffect("home-nav"),
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
      effect: makeEffect("home-content"),
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
      effect: makeEffect("profile-nav"),
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
      effect: makeEffect("profile-content"),
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
      effect: makeEffect("settings-nav"),
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
      effect: makeEffect("settings-content"),
    },
  ]

  const tour = useTour({ steps })

  const isActive = (path: string) => location.pathname === path

  return (
    <Box maxW="800px" mx="auto">
      <Stack gap={6}>
        <Box>
          <Button
            onClick={() => tour.start()}
            width="full"
            colorPalette="accent"
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
              bg="bg.muted"
              borderColor="border"
            >
              <HStack justify="space-between" mb={2}>
                <Text fontSize="sm" fontWeight="medium" color="fg">
                  Tour Progress
                </Text>
                <Badge colorPalette="accent">
                  Step {tour.stepIndex + 1} of {tour.totalSteps}
                </Badge>
              </HStack>
              <Text fontSize="xs" color="fg.muted">
                Current page: {location.pathname}
              </Text>
            </Box>
          )}
        </Box>

        <Box
          p={4}
          borderWidth="1px"
          borderRadius="xl"
          bg="bg.surface"
          borderColor="border"
        >
          <Text fontSize="sm" fontWeight="medium" mb={3} color="fg">
            Navigation
          </Text>
          <HStack gap={2}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                id="nav-home"
                size="sm"
                variant={isActive("/") ? "solid" : "outline"}
                colorPalette="accent"
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
                colorPalette="accent"
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
                colorPalette="accent"
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

export const TourWithRouting = () => (
  <MemoryRouter initialEntries={["/"]} initialIndex={0}>
    <TourContent />
  </MemoryRouter>
)
