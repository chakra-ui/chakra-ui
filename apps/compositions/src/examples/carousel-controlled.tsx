"use client"

import { Button, Carousel, HStack, Image, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"

const items = Array.from(
  { length: 5 },
  (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`,
)

export const CarouselControlled = () => {
  const [page, setPage] = useState(0)

  return (
    <VStack gap={5} align="center" py={6}>
      <Carousel.Root
        page={page}
        onPageChange={(e) => setPage(e.page)}
        slideCount={items.length}
        maxW="full"
        mx="auto"
      >
        <Carousel.ItemGroup>
          {items.map((src, index) => (
            <Carousel.Item key={index} index={index}>
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                w="100%"
                h="300px"
                objectFit="cover"
                borderRadius="md"
              />
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>

        <Carousel.Control>
          <Carousel.PrevTrigger />
          <Carousel.NextTrigger />
        </Carousel.Control>
      </Carousel.Root>

      <HStack justify="center" mt={2}>
        {items.map((_, index) => (
          <Button
            key={index}
            size="sm"
            variant={page === index ? "solid" : "outline"}
            colorScheme="blue"
            onClick={() => setPage(index)}
            disabled={page === index}
            cursor={page === index ? "not-allowed" : "pointer"}
          >
            {index + 1}
          </Button>
        ))}
      </HStack>

      <Text fontSize="sm" color="fg.muted" fontWeight="medium">
        Active page: {page + 1} / {items.length}
      </Text>
    </VStack>
  )
}

export default CarouselControlled
