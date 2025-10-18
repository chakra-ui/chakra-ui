import { Carousel, Image } from "@chakra-ui/react"

const items = Array.from(
  { length: 5 },
  (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`,
)

export const CarouselSlidesPerPage = () => {
  const slidesPerPage = 2
  const totalPages = Math.ceil(items.length / slidesPerPage)

  return (
    <Carousel.Root
      defaultPage={0}
      slideCount={items.length}
      slidesPerPage={slidesPerPage}
      slidesPerMove={slidesPerPage}
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
            />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      <Carousel.Control>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
      </Carousel.Control>

      <Carousel.IndicatorGroup>
        {Array.from({ length: totalPages }).map((_, index) => (
          <Carousel.Indicator
            key={index}
            index={index}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  )
}

export default CarouselSlidesPerPage
