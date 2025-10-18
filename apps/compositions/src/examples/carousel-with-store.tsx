"use client"

import {
  Box,
  Button,
  Carousel,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  useCarousel,
} from "@chakra-ui/react"
import { useState } from "react"

const items = Array.from(
  { length: 5 },
  (_, i) => `https://picsum.photos/seed/store-${i + 1}/600/300`,
)

export const CarouselWithStore = () => {
  const carousel = useCarousel({
    slideCount: items.length,
    allowMouseDrag: true,
  })
  const [targetPage, setTargetPage] = useState("")

  const handleGoToSlide = () => {
    const pageNum = parseInt(targetPage)
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= items.length) {
      carousel.scrollToIndex(pageNum - 1)
      setTargetPage("")
    }
  }

  return (
    <VStack gap={8} align="stretch" py={8} maxW="800px" mx="auto">
      <Carousel.RootProvider value={carousel}>
        <Carousel.ItemGroup>
          {items.map((src, index) => (
            <Carousel.Item key={index} index={index}>
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                w="100%"
                h="400px"
                objectFit="cover"
                borderRadius="lg"
                shadow="sm"
              />
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>

        <HStack justify="center" gap={4} my={8}>
          <Button
            size="md"
            onClick={() => carousel.scrollPrev()}
            disabled={!carousel.canScrollPrev}
          >
            Previous
          </Button>
          <Button
            size="md"
            onClick={() => carousel.scrollNext()}
            disabled={!carousel.canScrollNext}
          >
            Next
          </Button>
          <Button
            size="md"
            variant="outline"
            onClick={() => carousel.scrollToIndex(0)}
          >
            Reset
          </Button>
        </HStack>
        <Carousel.Indicators mt={4} count={items.length} />
        <Box
          bg="bg.muted"
          borderRadius="md"
          p={6}
          borderWidth="1px"
          borderColor="border"
          mt={5}
        >
          <VStack gap={4} align="stretch">
            <HStack gap={2}>
              <Input
                size="md"
                placeholder={`Enter 1-${items.length}`}
                type="number"
                min="1"
                max={items.length}
                flex="1"
                value={targetPage}
                onChange={(e) => {
                  const value = e.target.value
                  const num = parseInt(value)
                  if (
                    value === "" ||
                    (!isNaN(num) && num >= 1 && num <= items.length)
                  ) {
                    setTargetPage(value)
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleGoToSlide()
                }}
              />
              <Button
                size="md"
                colorScheme="blue"
                onClick={handleGoToSlide}
                disabled={
                  !targetPage ||
                  parseInt(targetPage) < 1 ||
                  parseInt(targetPage) > items.length
                }
              >
                Go to Slide
              </Button>
            </HStack>

            <VStack gap={2} align="stretch" fontSize="sm" color="fg.muted">
              <HStack justify="space-between">
                <Text>Current Slide:</Text>
                <Text fontWeight="semibold" color="fg">
                  {carousel.page + 1} of {items.length}
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text>Progress:</Text>
                <Text fontWeight="semibold" color="fg">
                  {((carousel.page / (items.length - 1)) * 100).toFixed(0)}%
                </Text>
              </HStack>
            </VStack>
          </VStack>
        </Box>
      </Carousel.RootProvider>
    </VStack>
  )
}

export default CarouselWithStore
