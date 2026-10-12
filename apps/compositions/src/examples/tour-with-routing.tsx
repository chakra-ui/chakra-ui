"use client"

import {
  Box,
  Button,
  HStack,
  Stack,
  Text,
  Tour,
  type TourStep,
  useTour,
} from "@chakra-ui/react"
import {
  Link,
  MemoryRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom"

export const TourWithRouting = () => (
  <MemoryRouter initialEntries={["/"]}>
    <TourContent />
  </MemoryRouter>
)

const TourContent = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const steps: TourStep[] = tourSteps.map((step) => ({
    ...step,
    effect: ({ show }) => {
      const path = stepToPage[step.id]
      if (path && location.pathname !== path) navigate(path)
      show()
      return () => {}
    },
  }))

  const tour = useTour({ steps })
  const isActive = (path: string) => location.pathname === path

  return (
    <Stack gap="4">
      <HStack gap="2">
        {pages.map((p) => (
          <Button
            key={p.path}
            size="sm"
            variant={isActive(p.path) ? "solid" : "outline"}
            asChild
          >
            <Link to={p.path}>{p.label}</Link>
          </Button>
        ))}
      </HStack>

      <Button size="sm" variant="outline" onClick={() => tour.start()}>
        Start Tour
      </Button>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

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
              <Tour.ActionTriggers />
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Tour.Root>
    </Stack>
  )
}

const HomePage = () => (
  <Box id="page-home" p="4" borderWidth="1px" borderRadius="md">
    <Text fontWeight="medium">Home</Text>
    <Text textStyle="sm" color="fg.muted">
      Welcome back! Here is your recent activity.
    </Text>
  </Box>
)

const SettingsPage = () => (
  <Box id="page-settings" p="4" borderWidth="1px" borderRadius="md">
    <Text fontWeight="medium">Settings</Text>
    <Text textStyle="sm" color="fg.muted">
      Configure your notification and privacy preferences.
    </Text>
  </Box>
)

const ProfilePage = () => (
  <Box id="page-profile" p="4" borderWidth="1px" borderRadius="md">
    <Text fontWeight="medium">Profile</Text>
    <Text textStyle="sm" color="fg.muted">
      Your name, email, and avatar settings.
    </Text>
  </Box>
)

const pages = [
  { label: "Home", path: "/" },
  { label: "Settings", path: "/settings" },
  { label: "Profile", path: "/profile" },
]

const stepToPage: Record<string, string> = {
  home: "/",
  settings: "/settings",
  profile: "/profile",
}

const tourSteps: Omit<TourStep, "effect">[] = [
  {
    id: "home",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#page-home"),
    title: "Home Page",
    description: "This is your home page with recent activity.",
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "settings",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#page-settings"),
    title: "Settings Page",
    description: "Manage your account preferences here.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "profile",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#page-profile"),
    title: "Profile Page",
    description: "View and edit your profile information.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Done", action: "dismiss" },
    ],
  },
]
