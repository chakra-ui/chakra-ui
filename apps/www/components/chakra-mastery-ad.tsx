import { Box, Button, Stack, Text } from "@chakra-ui/react"
import Link from "next/link"
import { LuPlay } from "react-icons/lu"

export const ChakraMasteryAd = () => {
  return (
    <Link
      href="https://mastery.chakra-ui.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Box bg="bg.muted" rounded="l2" p="4" mt="2">
        <Stack gap="1">
          <Text fontWeight="semibold" color="purple.fg">
            Master Chakra UI
          </Text>
          <Text textStyle="sm" color="fg.muted/80">
            Learn how to build design systems with hands-on examples and expert
            guidance
          </Text>

          <Button size="xs" mt="3" colorPalette="purple" textStyle="sm">
            <LuPlay />
            Watch Now
          </Button>
        </Stack>
      </Box>
    </Link>
  )
}
