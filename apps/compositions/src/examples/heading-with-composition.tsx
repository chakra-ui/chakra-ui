import { Button, Heading, Stack, Text } from "@chakra-ui/react"
import { LuArrowRight } from "react-icons/lu"

export const HeadingWithComposition = () => {
  return (
    <Stack align="flex-start">
      <Heading size="2xl">Modern payments for Stores</Heading>
      <Text mb="3" fontSize="md" color="fg.muted">
        PayMe helps startups get paid by anyone, anywhere in the world
      </Text>
      <Button>
        Create account <LuArrowRight />
      </Button>
    </Stack>
  )
}
