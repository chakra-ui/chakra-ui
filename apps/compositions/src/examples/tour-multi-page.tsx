"use client"

import {
  Badge,
  Box,
  Button,
  HStack,
  SimpleGrid,
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

export const TourMultiPage = () => (
  <MemoryRouter initialEntries={["/"]}>
    <AppShell />
  </MemoryRouter>
)

const AppShell = () => {
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
      <HStack gap="2" flexWrap="wrap">
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
        <Button size="sm" variant="outline" onClick={() => tour.start()}>
          Start Tour
        </Button>
      </HStack>

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
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
            <Tour.ProgressText />
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

const DashboardPage = () => (
  <Box id="page-dashboard" p="4" borderWidth="1px" borderRadius="md">
    <Text fontWeight="medium" mb="2">
      Dashboard
    </Text>
    <SimpleGrid columns={3} gap="3">
      <Box p="3" borderWidth="1px" borderRadius="md">
        <Text textStyle="sm" color="fg.muted">
          Total Users
        </Text>
        <Text fontWeight="semibold" textStyle="xl">
          1,234
        </Text>
      </Box>
      <Box p="3" borderWidth="1px" borderRadius="md">
        <Text textStyle="sm" color="fg.muted">
          Revenue
        </Text>
        <Text fontWeight="semibold" textStyle="xl">
          $12.4k
        </Text>
      </Box>
      <Box p="3" borderWidth="1px" borderRadius="md">
        <Text textStyle="sm" color="fg.muted">
          Active Projects
        </Text>
        <Text fontWeight="semibold" textStyle="xl">
          8
        </Text>
      </Box>
    </SimpleGrid>
  </Box>
)

const AnalyticsPage = () => (
  <Box id="page-analytics" p="4" borderWidth="1px" borderRadius="md">
    <Text fontWeight="medium" mb="2">
      Analytics
    </Text>
    <Stack gap="2">
      <HStack justify="space-between" p="2" borderWidth="1px" borderRadius="sm">
        <Text textStyle="sm">Page Views</Text>
        <Text textStyle="sm" fontWeight="medium">
          24,521
        </Text>
      </HStack>
      <HStack justify="space-between" p="2" borderWidth="1px" borderRadius="sm">
        <Text textStyle="sm">Bounce Rate</Text>
        <Text textStyle="sm" fontWeight="medium">
          32%
        </Text>
      </HStack>
      <HStack justify="space-between" p="2" borderWidth="1px" borderRadius="sm">
        <Text textStyle="sm">Avg. Session</Text>
        <Text textStyle="sm" fontWeight="medium">
          4m 12s
        </Text>
      </HStack>
    </Stack>
  </Box>
)

const ProjectsPage = () => (
  <Box id="page-projects" p="4" borderWidth="1px" borderRadius="md">
    <Text fontWeight="medium" mb="2">
      Projects
    </Text>
    <Stack gap="2">
      {["Design System", "Mobile App", "API v2"].map((name) => (
        <HStack
          key={name}
          p="2"
          borderWidth="1px"
          borderRadius="sm"
          justify="space-between"
        >
          <Text textStyle="sm">{name}</Text>
          <Badge size="sm">Active</Badge>
        </HStack>
      ))}
    </Stack>
  </Box>
)

const SettingsPage = () => (
  <Box id="page-settings" p="4" borderWidth="1px" borderRadius="md">
    <Text fontWeight="medium" mb="2">
      Settings
    </Text>
    <Stack gap="2">
      <HStack justify="space-between" p="2" borderWidth="1px" borderRadius="sm">
        <Text textStyle="sm">Theme</Text>
        <Text textStyle="sm" color="fg.muted">
          System
        </Text>
      </HStack>
      <HStack justify="space-between" p="2" borderWidth="1px" borderRadius="sm">
        <Text textStyle="sm">Language</Text>
        <Text textStyle="sm" color="fg.muted">
          English
        </Text>
      </HStack>
      <HStack justify="space-between" p="2" borderWidth="1px" borderRadius="sm">
        <Text textStyle="sm">Notifications</Text>
        <Text textStyle="sm" color="fg.muted">
          Enabled
        </Text>
      </HStack>
    </Stack>
  </Box>
)

const pages = [
  { label: "Dashboard", path: "/" },
  { label: "Analytics", path: "/analytics" },
  { label: "Projects", path: "/projects" },
  { label: "Settings", path: "/settings" },
]

const stepToPage: Record<string, string> = {
  dashboard: "/",
  analytics: "/analytics",
  projects: "/projects",
  settings: "/settings",
}

const tourSteps: Omit<TourStep, "effect">[] = [
  {
    id: "dashboard",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#page-dashboard"),
    title: "Dashboard Overview",
    description:
      "Your dashboard shows key metrics at a glance — users, revenue, and active projects.",
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "analytics",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#page-analytics"),
    title: "Analytics",
    description:
      "Dive deeper into traffic, engagement, and performance data for your app.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "projects",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#page-projects"),
    title: "Projects",
    description:
      "Manage all your projects in one place. Create, archive, and track progress.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "settings",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#page-settings"),
    title: "Settings",
    description:
      "Configure your theme, language, notifications, and account preferences.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Finish", action: "dismiss" },
    ],
  },
]
