"use client"

import {
  Button,
  Checkbox,
  HStack,
  Stack,
  Text,
  type TourStep,
  useTour,
} from "@chakra-ui/react"
import { Tour } from "compositions/ui/tour"
import { useEffect, useRef, useState } from "react"

const STORAGE_KEY = "chakra-tour-dont-show-again"

const isHidden = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true"
  } catch {
    return false
  }
}

const setHidden = (value: boolean) => {
  try {
    if (value) localStorage.setItem(STORAGE_KEY, "true")
    else localStorage.removeItem(STORAGE_KEY)
  } catch {}
}

export const TourDontShowAgain = () => {
  const [hidden, setHiddenState] = useState(false)
  const dontShowRef = useRef(false)
  const [dontShow, setDontShow] = useState(false)

  useEffect(() => setHiddenState(isHidden()), [])

  const tour = useTour({
    steps,
    onStatusChange({ status }) {
      if (status === "dismissed" || status === "completed") {
        setHidden(dontShowRef.current)
        setHiddenState(dontShowRef.current)
      }
    },
  })

  const openApp = () => {
    if (isHidden()) return
    tour.start()
  }

  return (
    <Stack gap="4">
      <HStack gap="3">
        <Button size="sm" onClick={openApp}>
          Open app
        </Button>
        {hidden && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setHidden(false)
              setHiddenState(false)
            }}
          >
            Reset
          </Button>
        )}
      </HStack>

      <Text textStyle="sm" color="fg.muted">
        {hidden
          ? "The welcome tour won't open again until you reset it."
          : "Opening the app shows the welcome tour."}
      </Text>

      <Tour tour={tour}>
        <Checkbox.Root
          size="sm"
          mt="2"
          checked={dontShow}
          onCheckedChange={(e) => {
            dontShowRef.current = !!e.checked
            setDontShow(!!e.checked)
          }}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>Don't show this again</Checkbox.Label>
        </Checkbox.Root>
      </Tour>
    </Stack>
  )
}

const steps: TourStep[] = [
  {
    id: "welcome",
    type: "dialog",
    title: "Welcome back",
    description: "Here's what changed since your last visit.",
    actions: [{ label: "Got it", action: "dismiss" }],
  },
]
