import { Tabs } from "@chakra-ui/react"
import { LuCheckSquare, LuFolder, LuUser } from "react-icons/lu"

export const TabsWithDisabledTab = () => {
  return (
    <Tabs.Root defaultValue="members">
      <Tabs.List>
        <Tabs.Trigger value="members">
          <LuUser />
          Members
        </Tabs.Trigger>
        <Tabs.Trigger value="projects" disabled>
          <LuFolder />
          Projects
        </Tabs.Trigger>
        <Tabs.Trigger value="tasks">
          <LuCheckSquare />
          Settings
        </Tabs.Trigger>
      </Tabs.List>
      {/* content */}
    </Tabs.Root>
  )
}
