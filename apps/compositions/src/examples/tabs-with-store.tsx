"use client"

import { Code, Stack, Tabs, useTabs } from "@chakra-ui/react"
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu"

export const TabsWithStore = () => {
  const tabs = useTabs({
    defaultValue: "members",
  })

  return (
    <Stack align="flex-start">
      <Code>selected: {tabs.value}</Code>
      <Tabs.RootProvider value={tabs}>
        <Tabs.List>
          <Tabs.Trigger value="members">
            <LuUser />
            Members
          </Tabs.Trigger>
          <Tabs.Trigger value="projects">
            <LuFolder />
            Projects
          </Tabs.Trigger>
          <Tabs.Trigger value="tasks">
            <LuSquareCheck />
            Tasks
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="members">Manage your team members</Tabs.Content>
        <Tabs.Content value="projects">Manage your projects</Tabs.Content>
        <Tabs.Content value="tasks">
          Manage your tasks for freelancers
        </Tabs.Content>
      </Tabs.RootProvider>
    </Stack>
  )
}
