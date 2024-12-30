import { Tabs } from "@chakra-ui/react"
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu"

export const TabsWithManualActivation = () => {
  return (
    <Tabs.Root defaultValue="members" activationMode="manual">
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
          <LuSquareCheck />
          Settings
        </Tabs.Trigger>
      </Tabs.List>
      {/* content */}
    </Tabs.Root>
  )
}
