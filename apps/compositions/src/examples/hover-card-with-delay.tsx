import { Box, HoverCard, Link, Portal, Strong } from "@chakra-ui/react"

export const HoverCardWithDelay = () => {
  return (
    <HoverCard.Root size="sm" openDelay={1000} closeDelay={100}>
      <HoverCard.Trigger asChild>
        <Link href="#">@chakra_ui</Link>
      </HoverCard.Trigger>
      <Portal>
        <HoverCard.Positioner>
          <HoverCard.Content maxWidth="240px">
            <HoverCard.Arrow />
            <Box>
              <Strong>Chakra</Strong> is a Sanskrit word that means disk or
              wheel, referring to energy centers in the body
            </Box>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Portal>
    </HoverCard.Root>
  )
}
