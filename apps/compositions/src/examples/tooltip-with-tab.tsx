import { Tabs } from "@chakra-ui/react"
import { Tooltip } from "compositions/ui/tooltip"
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu"

export const TooltipWithTab = () => {
  return (
    <Tabs.Root defaultValue="members">
      <Tabs.List>
        <Tooltip
          positioning={{ placement: "top" }}
          ids={{ trigger: "members" }}
          content="This is the tooltip content"
        >
          {/* TODO: Remove this once Zag.js is fixed */}
          <span>
            <Tabs.Trigger value="members">
              <LuUser />
              Members
            </Tabs.Trigger>
          </span>
        </Tooltip>
        <Tabs.Trigger value="projects">
          <LuFolder />
          Projects
        </Tabs.Trigger>
        <Tabs.Trigger value="tasks">
          <LuSquareCheck />
          Settings
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="members">Manage your team members</Tabs.Content>
      <Tabs.Content value="projects">Manage your projects</Tabs.Content>
      <Tabs.Content value="tasks">
        Manage your tasks for freelancers
      </Tabs.Content>
    </Tabs.Root>
  )
}
