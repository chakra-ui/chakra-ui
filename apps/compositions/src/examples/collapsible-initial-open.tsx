import { Collapsible, Stack } from "@chakra-ui/react"
import { LuChevronRight } from "react-icons/lu"
import LoremIpsum from "react-lorem-ipsum"

export const CollapsibleInitialOpen = () => (
  <Collapsible.Root defaultOpen>
    <Collapsible.Trigger
      paddingY="3"
      display="flex"
      gap="2"
      alignItems="center"
    >
      <Collapsible.Indicator
        transition="transform 0.2s"
        _open={{ transform: "rotate(90deg)" }}
      >
        <LuChevronRight />
      </Collapsible.Indicator>
      Toggle
    </Collapsible.Trigger>
    <Collapsible.Content>
      <Stack padding="4" borderWidth="1px">
        <LoremIpsum p={2} />
      </Stack>
    </Collapsible.Content>
  </Collapsible.Root>
)
