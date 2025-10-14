import { Carousel, Image } from "@chakra-ui/react"

const items = [
  "https://picsum.photos/400/300?random=1",
  "https://picsum.photos/400/300?random=2",
  "https://picsum.photos/400/300?random=3",
  "https://picsum.photos/400/300?random=4",
  "https://picsum.photos/400/300?random=5",
]

export const CarouselBasic = () => {
  return (
    <Carousel.Root slideCount={items.length} maxW="400px" mx="auto">
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

      <Carousel.IndicatorGroup>
        {items.map((_, index) => (
          <Carousel.Indicator
            key={index}
            index={index}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  )
}

export default CarouselBasic
