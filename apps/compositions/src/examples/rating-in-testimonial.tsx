import { HStack, Stack, Text } from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"
import { Rating } from "compositions/ui/rating"

export const RatingInTestimonial = () => {
  return (
    <Stack maxW="320px" gap="4">
      <Rating colorPalette="orange" readOnly size="xs" defaultValue={5} />

      <Text>
        Sage is a great software engineer. He is very professional and
        knowledgeable.
      </Text>

      <HStack gap="4">
        <Avatar
          name="Matthew Jones"
          src="https://randomuser.me/api/portraits/men/70.jpg"
        />
        <Stack textStyle="sm" gap="0">
          <Text fontWeight="medium">Matthew Jones</Text>
          <Text color="fg.subtle">CTO, Company</Text>
        </Stack>
      </HStack>
    </Stack>
  )
}
