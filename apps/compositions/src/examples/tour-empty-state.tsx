"use client"

import {
  Button,
  EmptyState,
  HStack,
  Stack,
  Text,
  type TourStep,
  VStack,
  useTour,
  waitForElement,
  waitForEvent,
} from "@chakra-ui/react"
import { Tour } from "compositions/ui/tour"
import { useState } from "react"
import { LuFolderPlus } from "react-icons/lu"

export const TourEmptyState = () => {
  const [projects, setProjects] = useState<string[]>([])
  const tour = useTour({ steps })

  const createProject = () =>
    setProjects((prev) => [...prev, `Project ${prev.length + 1}`])

  return (
    <Stack gap="4" maxW="md" w="full">
      {projects.length === 0 ? (
        <EmptyState.Root borderWidth="1px" rounded="l3">
          <EmptyState.Content>
            <EmptyState.Indicator>
              <LuFolderPlus />
            </EmptyState.Indicator>
            <VStack textAlign="center">
              <EmptyState.Title>No projects yet</EmptyState.Title>
              <EmptyState.Description>
                Projects keep your files and teammates in one place.
              </EmptyState.Description>
            </VStack>
            <HStack>
              <Button id="empty-create" size="sm" onClick={createProject}>
                Create project
              </Button>
              <Button size="sm" variant="outline" onClick={() => tour.start()}>
                Show me how
              </Button>
            </HStack>
          </EmptyState.Content>
        </EmptyState.Root>
      ) : (
        <Stack gap="2">
          {projects.map((name, index) => (
            <Text
              key={name}
              id={index === 0 ? "first-project" : undefined}
              borderWidth="1px"
              rounded="l2"
              px="3"
              py="2"
            >
              {name}
            </Text>
          ))}
          <Button
            size="sm"
            variant="ghost"
            alignSelf="flex-start"
            onClick={() => setProjects([])}
          >
            Reset
          </Button>
        </Stack>
      )}

      <Tour tour={tour} />
    </Stack>
  )
}

const steps: TourStep[] = [
  {
    id: "create",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#empty-create"),
    title: "Create your first project",
    description: "Click the button to make one.",
    effect({ next, show, target }) {
      show()
      const [promise, cancel] = waitForEvent(target, "click")
      promise.then(next)
      return cancel
    },
  },
  {
    id: "project",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#first-project"),
    title: "There it is",
    description: "Open a project to add files and invite teammates.",
    effect({ show }) {
      const [promise, cancel] = waitForElement(
        () => document.querySelector<HTMLElement>("#first-project"),
        { timeout: 3000 },
      )
      promise.then(show)
      return cancel
    },
    actions: [{ label: "Done", action: "dismiss" }],
  },
]
