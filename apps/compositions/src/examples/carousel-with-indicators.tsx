import { Carousel } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

const items = Array.from({ length: 5 })

export const CarouselWithIndicators = () => {
  return (
    <Carousel.Root slideCount={items.length} maxW="md" mx="auto" gap="4">
      <Carousel.ItemGroup>
        {items.map((_, index) => (
          <Carousel.Item key={index} index={index}>
            <DecorativeBox w="100%" h="300px" rounded="lg" fontSize="2.5rem">
              {index + 1}
            </DecorativeBox>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      <Carousel.Control justifyContent="center" gap="4">
        <Carousel.Indicators />
      </Carousel.Control>
    </Carousel.Root>
  )
}
