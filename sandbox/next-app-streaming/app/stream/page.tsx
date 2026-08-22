import {
  Avatar,
  Badge,
  Container,
  HStack,
  Heading,
  RatingGroup,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react"
import { connection } from "next/server"
import { Suspense } from "react"

const reviews = [
  {
    name: "Maya Chen",
    rating: 5,
    verified: true,
    body: "Battery lasts through a full work week. ANC is strong on the train.",
  },
  {
    name: "James Okonkwo",
    rating: 4,
    verified: true,
    body: "Comfortable after an hour. Pads run a little warm.",
  },
  {
    name: "Priya Shah",
    rating: 5,
    verified: false,
    body: "Pairing was instant. Worth it for long-haul flights.",
  },
]

export default function ProductPage() {
  return (
    <Container py="10" maxW="lg">
      <Heading size="lg">Wireless Headphones</Heading>
      <Text mt="1" fontWeight="medium">
        $129.00
      </Text>
      <Text mt="3" color="fg.muted">
        Over-ear, 30-hour battery, active noise cancelling.
      </Text>

      <Heading size="md" mt="10" mb="4">
        Reviews
      </Heading>
      <Suspense fallback={<Text color="fg.muted">Loading reviews…</Text>}>
        <ReviewList />
      </Suspense>
    </Container>
  )
}

async function ReviewList() {
  await connection()
  await new Promise((resolve) => setTimeout(resolve, 400))

  return (
    <VStack align="stretch" gap="4">
      {reviews.map((review) => (
        <VStack key={review.name} align="stretch" gap="2">
          <HStack gap="3">
            <Avatar.Root size="sm">
              <Avatar.Fallback name={review.name} />
            </Avatar.Root>
            <VStack align="start" gap="0">
              <HStack gap="2">
                <Text fontWeight="medium">{review.name}</Text>
                {review.verified && (
                  <Badge size="sm" colorPalette="green" variant="subtle">
                    Verified
                  </Badge>
                )}
              </HStack>
              <RatingGroup.Root
                readOnly
                count={5}
                defaultValue={review.rating}
                size="xs"
              >
                <RatingGroup.HiddenInput />
                <RatingGroup.Control />
              </RatingGroup.Root>
            </VStack>
          </HStack>
          <Text color="fg.muted">{review.body}</Text>
          <Separator />
        </VStack>
      ))}
    </VStack>
  )
}
