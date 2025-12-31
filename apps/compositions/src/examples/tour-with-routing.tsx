"use client"

import {
  Box,
  Button,
  Card,
  DataList,
  HStack,
  Image,
  Input,
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

export const TourWithRouting = () => (
  <MemoryRouter initialEntries={["/"]} initialIndex={0}>
    <TourContent />
  </MemoryRouter>
)

const TourContent = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const steps: TourStep[] = tourSteps.map((step) => ({
    ...step,
    effect: ({ show }) => {
      const targetPath = stepToPageMap[step.id]
      if (targetPath && location.pathname !== targetPath) navigate(targetPath)
      show()
      return () => {}
    },
  }))

  const tour = useTour({ steps })

  const isActive = (path: string) => location.pathname === path

  return (
    <Box py={6} maxW="2xl" mx="auto">
      <Button onClick={() => tour.start()} mb={4}>
        Start Tour
      </Button>

      <HStack gap={2} mb={4}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{ textDecoration: "none" }}
          >
            <Button variant={isActive(item.path) ? "solid" : "outline"}>
              {item.label}
            </Button>
          </Link>
        ))}
      </HStack>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/activity" element={<ActivityPage />} />
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
            <Tour.Control justifyContent="flex-end" gap="2">
              <Tour.ActionTriggers />
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Tour.Root>
    </Box>
  )
}

const LoginPage = () => (
  <Box p={4} borderWidth="1px" borderRadius="lg">
    <Text fontSize="xl" fontWeight="bold" mb={4}>
      Login
    </Text>
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <Stack gap={3}>
        <Input name="username" placeholder="Username" />
        <Input name="password" type="password" placeholder="Password" />
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  </Box>
)

const WelcomePage = () => (
  <Box p={4} borderWidth="1px" borderRadius="lg" id="welcome-page">
    <Text fontSize="xl" fontWeight="bold" mb={2}>
      Welcome, Sage!
    </Text>
    <Text mb={3}>Here's a quick summary of your profile:</Text>
    <DataList.Root size="md">
      <DataList.Item>
        <DataList.ItemLabel>Username</DataList.ItemLabel>
        <DataList.ItemValue>Sage</DataList.ItemValue>
      </DataList.Item>
      <DataList.Item>
        <DataList.ItemLabel>Email</DataList.ItemLabel>
        <DataList.ItemValue>sage@chakra.com</DataList.ItemValue>
      </DataList.Item>
      <DataList.Item>
        <DataList.ItemLabel>Role</DataList.ItemLabel>
        <DataList.ItemValue>Admin</DataList.ItemValue>
      </DataList.Item>
    </DataList.Root>
  </Box>
)

const ActivityPage = () => (
  <Stack gap={4} id="activity-page">
    <Text fontSize="xl" fontWeight="bold">
      Recent Activities
    </Text>
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
      {activities.map((activity, index) => (
        <CardWithImage
          key={index}
          title={activity.title}
          description={activity.description}
          image={activity.image}
        />
      ))}
    </SimpleGrid>
  </Stack>
)

const CardWithImage = ({
  title,
  description,
  image,
}: {
  title: string
  description: string
  image: string
}) => (
  <Card.Root maxW="sm" overflow="hidden">
    <Image src={image} alt={title} />
    <Card.Body>
      <Text fontWeight="bold">{title}</Text>
      <Text fontSize="sm">{description}</Text>
    </Card.Body>
    <Card.Footer>
      <Button variant="solid" size="sm">
        View
      </Button>
    </Card.Footer>
  </Card.Root>
)

const navItems = [
  { label: "Login", path: "/" },
  { label: "Welcome", path: "/welcome" },
  { label: "Activity", path: "/activity" },
]

const stepToPageMap: Record<string, string> = {
  login: "/",
  welcome: "/welcome",
  activity: "/activity",
}

const tourSteps: Omit<TourStep, "effect">[] = [
  {
    id: "login",
    type: "dialog",
    title: "Login Page",
    description: "Submit your username and password to start.",
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "welcome",
    type: "tooltip",
    target: () => document.querySelector("#welcome-page"),
    title: "Profile Overview",
    description: "See your profile information.",
    actions: [
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "activity",
    type: "tooltip",
    target: () => document.querySelector("#activity-page"),
    title: "Activity Dashboard",
    description: "Here's your activity.",
    actions: [
      { label: "Back", action: "prev" },
      { label: "Finish", action: "dismiss" },
    ],
  },
]

const activities = [
  {
    title: "New Project Launch",
    description: "Check out the details of our latest project launch.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Team Meetup",
    description: "Our team had a successful meetup in the city.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
]
