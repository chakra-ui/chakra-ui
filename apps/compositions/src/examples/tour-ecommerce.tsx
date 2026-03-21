"use client"

import {
  Badge,
  Box,
  Button,
  HStack,
  Stack,
  Text,
  Tour,
  type TourStep,
  VStack,
  useTour,
} from "@chakra-ui/react"

export const TourEcommerce = () => {
  const tour = useTour({ steps })

  return (
    <VStack gap="4" alignItems="stretch" maxW="lg">
      <Button size="sm" alignSelf="flex-start" onClick={() => tour.start()}>
        How to Shop
      </Button>

      <Box borderWidth="1px" borderRadius="md" overflow="hidden">
        <Box id="product-image" bg="bg.muted" h="160px" p="4">
          <Text
            textStyle="sm"
            color="fg.muted"
            textAlign="center"
            lineHeight="160px"
          >
            Product Image
          </Text>
        </Box>

        <Stack gap="3" p="4">
          <HStack justify="space-between">
            <Box>
              <Text fontWeight="semibold">Wireless Headphones</Text>
              <Text textStyle="sm" color="fg.muted">
                Noise-cancelling, 30hr battery
              </Text>
            </Box>
            <Text fontWeight="bold" textStyle="xl">
              $249
            </Text>
          </HStack>

          <HStack id="product-variants" gap="2">
            <Button size="xs" variant="outline">
              Black
            </Button>
            <Button size="xs" variant="outline">
              White
            </Button>
            <Button size="xs" variant="outline">
              Navy
            </Button>
          </HStack>

          <HStack id="product-actions" gap="2">
            <Button size="sm" flex="1">
              Add to Cart
            </Button>
            <Button size="sm" variant="outline">
              Wishlist
            </Button>
          </HStack>

          <Box id="product-reviews" p="3" borderWidth="1px" borderRadius="sm">
            <HStack mb="1">
              <Text textStyle="sm" fontWeight="medium">
                Reviews
              </Text>
              <Badge size="sm">4.8 / 5</Badge>
            </HStack>
            <Text textStyle="xs" color="fg.muted">
              Based on 2,341 reviews
            </Text>
          </Box>
        </Stack>
      </Box>

      <Tour.Root tour={tour}>
        <Tour.Backdrop />
        <Tour.Spotlight />
        <Tour.Positioner>
          <Tour.Content>
            <Tour.Arrow>
              <Tour.ArrowTip />
            </Tour.Arrow>
            <Tour.CloseTrigger />
            <Tour.ProgressText />
            <Tour.Title />
            <Tour.Description />
            <Tour.Control>
              <Tour.ActionTriggers />
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Tour.Root>
    </VStack>
  )
}

const steps: TourStep[] = [
  {
    id: "image",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#product-image"),
    placement: "bottom",
    title: "Product Gallery",
    description:
      "Browse product photos. Swipe or click arrows to see different angles and colors.",
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "variants",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#product-variants"),
    title: "Choose Your Color",
    description:
      "Select a color variant. The product image and price will update automatically.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "actions",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#product-actions"),
    title: "Add to Cart or Wishlist",
    description:
      "Ready to buy? Add it to your cart. Not sure yet? Save it to your wishlist for later.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "reviews",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#product-reviews"),
    title: "Customer Reviews",
    description:
      "Read what other buyers think. Filter by rating, sort by most helpful, or search reviews.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Done", action: "dismiss" },
    ],
  },
]
