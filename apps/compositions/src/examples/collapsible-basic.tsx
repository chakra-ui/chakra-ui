import { Box, Collapsible } from "@chakra-ui/react"

export const CollapsibleBasic = () => (
  <Collapsible.Root>
    <Collapsible.Trigger paddingY="3">Toggle Collapsible</Collapsible.Trigger>
    <Collapsible.Content>
      <Box padding="4" borderWidth="1px">
        <strong>Chakra UI</strong> embraces this philosophy in the world of
        design and development. Just like chakras align energy in the body,
        Chakra UI aligns your design system — bringing flow, consistency, and
        peace of mind to your codebase. It helps developers focus on creating
        beautiful, accessible UIs without friction.
        <br />
        <br />
        Think of each component as a wheel in your app’s UI — smooth, connected,
        and full of potential. Build with harmony. Build with
        <strong>Chakra UI</strong>.
      </Box>
    </Collapsible.Content>
  </Collapsible.Root>
)
