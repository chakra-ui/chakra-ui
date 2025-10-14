"use client"

import { Tabs, useBreakpointValue } from "@chakra-ui/react"

export const TabsWithResponsiveOrientation = () => {
  const orientation = useBreakpointValue<"horizontal" | "vertical">({
    base: "horizontal",
    md: "vertical",
  })

  return (
    <Tabs.Root
      variant="subtle"
      defaultValue="members"
      orientation={orientation}
    >
      <Tabs.List>
        <Tabs.Trigger value="members">Members</Tabs.Trigger>
        <Tabs.Trigger value="projects">Projects</Tabs.Trigger>
        <Tabs.Trigger value="tasks">Settings</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="members">
        Manage your team members and their roles here.
      </Tabs.Content>

      <Tabs.Content value="projects">
        Manage your projects and their status here.
      </Tabs.Content>

      <Tabs.Content value="tasks">
        Manage your tasks and their progress here.
      </Tabs.Content>
    </Tabs.Root>
  )
}
