"use client"

import { Button, Text } from "@chakra-ui/react"
import { FloatingPanel } from "compositions/ui/floating-panel"

export const FloatingPanelRtl = () => {
  return (
    <FloatingPanel.Root
      dir="rtl"
      persistRect
      defaultSize={{ width: 320, height: 200 }}
      minSize={{ width: 320, height: 200 }}
    >
      <FloatingPanel.Trigger asChild>
        <Button variant="outline" size="sm">
          فتح اللوحة
        </Button>
      </FloatingPanel.Trigger>
      <FloatingPanel.Content title="لوحة عائمة" showMaximize>
        <Text textStyle="sm">
          هذه اللوحة تدعم اتجاه النص من اليمين إلى اليسار.
        </Text>
      </FloatingPanel.Content>
    </FloatingPanel.Root>
  )
}
