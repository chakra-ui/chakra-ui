import { Box, Collapsible } from "@chakra-ui/react"

export const CollapsibleWithDisabled = () => (
  <Collapsible.Root disabled>
    <Collapsible.Trigger _disabled={{ opacity: "0.5" }}>
      Toggle (Disabled)
    </Collapsible.Trigger>
    <Collapsible.Content>
      <Box padding="4" borderWidth="1px">
        This content cannot be toggled because the collapsible is disabled using
        the <code>disabled</code> prop.
      </Box>
    </Collapsible.Content>
  </Collapsible.Root>
)
