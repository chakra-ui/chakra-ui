import { Carousel, chakra } from "@chakra-ui/react-next"

const items = Array.from({ length: 5 })

export const CarouselBasic = () => {
  return (
    <Carousel.Root slideCount={items.length}>
      <Carousel.ItemGroup>
        {items.map((_, index) => (
          <Carousel.Item key={index} index={index}>
            <chakra.div
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="100%"
              h="300px"
              rounded="lg"
              fontSize="2.5rem"
              bg="bg.subtle"
            >
              {index + 1}
            </chakra.div>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      <Carousel.Control>
        <Carousel.PrevTrigger>Prev</Carousel.PrevTrigger>
        <Carousel.Indicators />
        <Carousel.NextTrigger>Next</Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}
