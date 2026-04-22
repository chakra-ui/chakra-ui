"use client"

import {
  Badge,
  Box,
  Button,
  Code,
  HStack,
  Heading,
  IconButton,
  Input,
  Stack,
  Table,
  Text,
  Tour,
  type TourStep,
  createToaster,
  useTour,
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { LuCopy, LuMoon, LuSearch, LuSun } from "react-icons/lu"
import {
  Link,
  MemoryRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom"
import { TourOverlay } from "./tour-parts"
import { TourAppShell } from "./tour-shell"

const toaster = createToaster({ placement: "top-end", overlap: true })

export const TourMultiPage = () => (
  <MemoryRouter initialEntries={["/"]}>
    <DocsTour />
  </MemoryRouter>
)

const DocsTour = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isDark, setIsDark] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const copyRef = useRef<HTMLButtonElement>(null)

  const typeInto = async (el: HTMLInputElement, text: string) => {
    el.focus()
    el.value = ""
    for (const ch of text) {
      el.value += ch
      el.dispatchEvent(new Event("input", { bubbles: true }))
      await new Promise((r) => setTimeout(r, 40))
    }
  }

  const steps: TourStep[] = [
    {
      id: "welcome",
      type: "dialog",
      title: "The quickest tour of Chakra 🚀",
      description: "Six clicks to know your way around. Ready?",
      actions: [{ label: "Start", action: "next" }],
    },
    {
      id: "components",
      type: "tooltip",
      target: () =>
        document.querySelector<HTMLElement>("#docs-sidebar-components"),
      title: "Everything you can build",
      description:
        "60+ components, grouped by purpose. Search is faster though.",
      effect: ({ show }) => {
        if (location.pathname !== "/") navigate("/")
        show()
        return () => {}
      },
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "search",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#docs-search"),
      title: "Find anything instantly",
      description:
        "Fuzzy search across components, recipes, and the API reference.",
      effect: ({ show }) => {
        show()
        const input = searchRef.current
        if (input) void typeInto(input, "tour")
        return () => {
          if (searchRef.current) searchRef.current.value = ""
        }
      },
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "tour-link",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#docs-nav-tour"),
      title: "Component pages",
      description:
        "Every component has a live playground, props, and 15+ examples.",
      effect: ({ show }) => {
        navigate("/components/tour")
        show()
        return () => {}
      },
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "theme",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#docs-theme-toggle"),
      title: "Dark mode that actually works 🌙",
      description:
        "Every component is tested in both modes — including this tour.",
      effect: ({ show }) => {
        setIsDark((d) => !d)
        show()
        return () => {}
      },
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "copy",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#docs-copy-snippet"),
      title: "Copy-ready code",
      description: "Snippets are full examples — no hidden imports, no magic.",
      effect: ({ show }) => {
        show()
        copyRef.current?.click()
        return () => {}
      },
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "done",
      type: "dialog",
      title: "Go build something 💜",
      description: "You've seen the map. The rest is yours.",
      actions: [{ label: "Finish", action: "dismiss" }],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Stack gap="3">
      <Button size="sm" alignSelf="flex-start" onClick={() => tour.start()}>
        Start docs tour
      </Button>

      <Box
        data-theme={isDark ? "dark" : "light"}
        colorPalette="purple"
        bg={isDark ? "gray.950" : "white"}
        color={isDark ? "gray.50" : "gray.900"}
        borderRadius="lg"
      >
        <TourAppShell
          logo={<Text fontWeight="bold">Chakra</Text>}
          search={
            <HStack gap="2" borderWidth="1px" borderRadius="md" px="2" py="1">
              <LuSearch />
              <Input
                id="docs-search"
                ref={searchRef}
                variant="flushed"
                placeholder="Search components, recipes…"
                border="none"
                size="sm"
              />
            </HStack>
          }
          actions={
            <IconButton
              id="docs-theme-toggle"
              aria-label="Toggle theme"
              size="sm"
              variant="ghost"
              onClick={() => setIsDark((d) => !d)}
            >
              {isDark ? <LuSun /> : <LuMoon />}
            </IconButton>
          }
          sidebar={
            <>
              <SidebarLabel>Getting started</SidebarLabel>
              <SidebarLabel id="docs-sidebar-components" active>
                Components
              </SidebarLabel>
              <SidebarLink to="/">Button</SidebarLink>
              <SidebarLink to="/">Input</SidebarLink>
              <SidebarLink id="docs-nav-tour" to="/components/tour">
                Tour
              </SidebarLink>
              <SidebarLink to="/">Menu</SidebarLink>
              <SidebarLink to="/">Dialog</SidebarLink>
              <SidebarLabel>Theming</SidebarLabel>
              <SidebarLabel>Recipes</SidebarLabel>
            </>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/components/tour"
              element={<TourPage copyRef={copyRef} />}
            />
            <Route path="/theming" element={<div />} />
          </Routes>
        </TourAppShell>
      </Box>

      <Tour.Root tour={tour}>
        <TourOverlay />
      </Tour.Root>
    </Stack>
  )
}

const SidebarLabel = (props: {
  id?: string
  active?: boolean
  children: React.ReactNode
}) => (
  <Text
    id={props.id}
    fontSize="xs"
    fontWeight="semibold"
    textTransform="uppercase"
    color={props.active ? "purple.600" : "fg.muted"}
    letterSpacing="wide"
    mt="3"
  >
    {props.children}
  </Text>
)

const SidebarLink = (props: {
  id?: string
  to: string
  children: React.ReactNode
}) => (
  <Link id={props.id} to={props.to}>
    <Text
      fontSize="sm"
      px="2"
      py="1"
      borderRadius="sm"
      _hover={{ bg: "bg.muted" }}
    >
      {props.children}
    </Text>
  </Link>
)

const HomePage = () => (
  <Stack gap="3">
    <Heading size="xl">Build accessible React apps with speed.</Heading>
    <Text color="fg.muted" maxW="prose">
      60+ components, built on Zag state machines, themed with tokens and
      recipes. Works with Next.js, Remix, Vite, and RSC.
    </Text>
    <HStack gap="2">
      <Badge colorPalette="purple">v3.latest</Badge>
      <Badge variant="outline">MIT</Badge>
      <Badge variant="outline">TypeScript</Badge>
    </HStack>
  </Stack>
)

const TourPage = (props: {
  copyRef: React.RefObject<HTMLButtonElement | null>
}) => (
  <Stack gap="4">
    <Heading size="lg">Tour</Heading>
    <Text color="fg.muted">
      Guide users through your product with spotlights and tooltips.
    </Text>
    <Box borderWidth="1px" borderRadius="md" overflow="hidden">
      <HStack
        justify="space-between"
        px="3"
        py="2"
        bg="bg.subtle"
        borderBottomWidth="1px"
      >
        <Text fontSize="xs" color="fg.muted">
          Example
        </Text>
        <IconButton
          id="docs-copy-snippet"
          ref={props.copyRef}
          aria-label="Copy"
          size="xs"
          variant="ghost"
          onClick={() => toaster.success({ title: "Copied!", duration: 1500 })}
        >
          <LuCopy />
        </IconButton>
      </HStack>
      <Box as="pre" p="3" fontSize="xs" overflowX="auto">
        <Code variant="plain">{`const tour = useTour({ steps })
<Tour.Root tour={tour}>
  <Tour.Backdrop />
  <Tour.Spotlight />
  <Tour.Positioner>...</Tour.Positioner>
</Tour.Root>`}</Code>
      </Box>
    </Box>
    <Table.Root size="sm">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Prop</Table.ColumnHeader>
          <Table.ColumnHeader>Type</Table.ColumnHeader>
          <Table.ColumnHeader>Default</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>steps</Table.Cell>
          <Table.Cell>TourStep[]</Table.Cell>
          <Table.Cell>—</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>defaultStep</Table.Cell>
          <Table.Cell>string</Table.Cell>
          <Table.Cell>—</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  </Stack>
)
