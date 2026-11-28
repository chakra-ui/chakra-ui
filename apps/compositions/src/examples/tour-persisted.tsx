"use client"

import {
  Button,
  HStack,
  Stack,
  Text,
  type TourStep,
  useTour,
} from "@chakra-ui/react"
import { Tour } from "compositions/ui/tour"
import { useEffect, useState } from "react"

const STORAGE_KEY = "chakra-tour-persisted-step"

const read = () => {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

const write = (stepId: string | null) => {
  try {
    if (stepId) localStorage.setItem(STORAGE_KEY, stepId)
    else localStorage.removeItem(STORAGE_KEY)
  } catch {}
}

export const TourPersisted = () => {
  const [savedStep, setSavedStep] = useState<string | null>(null)

  useEffect(() => setSavedStep(read()), [])

  const tour = useTour({
    steps,
    onStepChange({ stepId }) {
      write(stepId)
      setSavedStep(stepId)
    },
    onStatusChange({ status }) {
      if (status === "completed") {
        write(null)
        setSavedStep(null)
      }
    },
  })

  return (
    <Stack gap="4">
      <HStack gap="3">
        <Button size="sm" onClick={() => tour.start(savedStep ?? undefined)}>
          {savedStep ? "Resume tour" : "Start tour"}
        </Button>
        {savedStep && (
          <Text textStyle="sm" color="fg.muted">
            Saved at step "{savedStep}". Close the tour or reload the page, then
            resume.
          </Text>
        )}
      </HStack>

      <HStack gap="3">
        <Button id="persisted-files" variant="outline" size="sm">
          Files
        </Button>
        <Button id="persisted-share" variant="outline" size="sm">
          Share
        </Button>
        <Button id="persisted-settings" variant="outline" size="sm">
          Settings
        </Button>
      </HStack>

      <Tour tour={tour} />
    </Stack>
  )
}

const steps: TourStep[] = [
  {
    id: "files",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#persisted-files"),
    title: "Files",
    description: "Everything you upload lives here.",
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "share",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#persisted-share"),
    title: "Share",
    description: "Send a link to anyone on your team.",
    actions: [
      { label: "Previous", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "settings",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#persisted-settings"),
    title: "Settings",
    description: "Finishing the tour clears the saved step.",
    actions: [
      { label: "Previous", action: "prev" },
      { label: "Finish", action: "dismiss" },
    ],
  },
]
