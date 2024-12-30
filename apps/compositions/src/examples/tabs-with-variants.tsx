import { For, SimpleGrid, Tabs } from "@chakra-ui/react"
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu"

export const TabsWithVariants = () => {
  return (
    <SimpleGrid columns={2} gap="14" width="full">
      <For each={["line", "subtle", "enclosed", "outline", "plain"]}>
        {(variant) => (
          <Tabs.Root key={variant} defaultValue="members" variant={variant}>
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
                Settings
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="members">
              Manage your team members
            </Tabs.Content>
            <Tabs.Content value="projects">Manage your projects</Tabs.Content>
            <Tabs.Content value="tasks">
              Manage your tasks for freelancers
            </Tabs.Content>
          </Tabs.Root>
        )}
      </For>
    </SimpleGrid>
  )
}
