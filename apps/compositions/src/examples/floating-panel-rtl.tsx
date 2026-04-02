"use client"

import { Button, FloatingPanel, IconButton, Text } from "@chakra-ui/react"
import { LuGripHorizontal, LuMinus, LuSquare, LuX } from "react-icons/lu"

export const FloatingPanelRtl = () => {
  return (
    <FloatingPanel.Root
      defaultOpen
      dir="rtl"
      defaultPosition={{ x: 100, y: 100 }}
      defaultSize={{ width: 320, height: 200 }}
    >
      <FloatingPanel.Trigger asChild>
        <Button variant="outline" size="sm">
          فتح اللوحة
        </Button>
      </FloatingPanel.Trigger>
      <FloatingPanel.Positioner>
        <FloatingPanel.Content>
          <FloatingPanel.Header>
            <FloatingPanel.DragTrigger>
              <LuGripHorizontal />
              <FloatingPanel.Title>لوحة عائمة</FloatingPanel.Title>
            </FloatingPanel.DragTrigger>
            <FloatingPanel.StageTrigger stage="minimized" asChild>
              <IconButton variant="ghost" size="2xs" aria-label="تصغير">
                <LuMinus />
              </IconButton>
            </FloatingPanel.StageTrigger>
            <FloatingPanel.StageTrigger stage="maximized" asChild>
              <IconButton variant="ghost" size="2xs" aria-label="تكبير">
                <LuSquare />
              </IconButton>
            </FloatingPanel.StageTrigger>
            <FloatingPanel.CloseTrigger asChild>
              <IconButton variant="ghost" size="2xs" aria-label="إغلاق">
                <LuX />
              </IconButton>
            </FloatingPanel.CloseTrigger>
          </FloatingPanel.Header>
          <FloatingPanel.Body>
            <Text textStyle="sm">
              هذه اللوحة تدعم اتجاه النص من اليمين إلى اليسار.
            </Text>
          </FloatingPanel.Body>
          <FloatingPanel.ResizeTriggers />
        </FloatingPanel.Content>
      </FloatingPanel.Positioner>
    </FloatingPanel.Root>
  )
}
