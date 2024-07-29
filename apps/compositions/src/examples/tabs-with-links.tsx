import { Link, Tabs } from "@chakra-ui/react"

export const TabsWithLinks = () => {
  return (
    <Tabs.Root defaultValue="members">
      <Tabs.List>
        <Tabs.Trigger value="members" asChild>
          <Link unstyled href="#members">
            Members
          </Link>
        </Tabs.Trigger>
        <Tabs.Trigger value="projects" asChild>
          <Link unstyled href="#projects">
            Projects
          </Link>
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="members">Manage your team members</Tabs.Content>
      <Tabs.Content value="projects">Manage your projects</Tabs.Content>
    </Tabs.Root>
  )
}
