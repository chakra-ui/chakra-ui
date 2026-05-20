"use client"

import {
  Button,
  FloatingPanel,
  HStack,
  IconButton,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useState } from "react"
import { LuGripHorizontal, LuX } from "react-icons/lu"

type Stage = "default" | "minimized" | "maximized"

export const FloatingPanelControlledStage = () => {
  const [stage, setStage] = useState<Stage>("default")

  return (
    <FloatingPanel.Root
      stage={stage}
      onStageChange={(details) => setStage(details.stage)}
      defaultSize={{ width: 320, height: 220 }}
      minSize={{ width: 280, height: 160 }}
    >
      <FloatingPanel.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Panel
        </Button>
      </FloatingPanel.Trigger>
      <Portal>
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.Header>
              <FloatingPanel.DragTrigger>
                <LuGripHorizontal />
                <FloatingPanel.Title>Controlled Stage</FloatingPanel.Title>
              </FloatingPanel.DragTrigger>
              <FloatingPanel.Control>
                <FloatingPanel.CloseTrigger asChild>
                  <IconButton variant="ghost" size="2xs">
                    <LuX />
                  </IconButton>
                </FloatingPanel.CloseTrigger>
              </FloatingPanel.Control>
            </FloatingPanel.Header>
            <FloatingPanel.Body>
              <Stack gap="3">
                <HStack gap="2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setStage("minimized")}
                  >
                    Minimize
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setStage("maximized")}
                  >
                    Maximize
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setStage("default")}
                  >
                    Restore
                  </Button>
                </HStack>
                <Text textStyle="sm" color="fg.muted" fontFamily="mono">
                  {stage}
                </Text>
              </Stack>
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggers />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
  )
}
