import { Carousel, IconButton } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"

const items = Array.from({ length: 5 })

export const CarouselWithFloatingArrow = () => {
  return (
    <Carousel.Root slideCount={items.length} maxW="xl" mx="auto" gap="4">
      <Carousel.Control justifyContent="center" gap="4" width="full">
        <Carousel.PrevTrigger asChild>
          <IconButton size="xs" variant="outline">
            <LuArrowLeft />
          </IconButton>
        </Carousel.PrevTrigger>

        <Carousel.ItemGroup width="full">
          {items.map((_src, index) => (
            <Carousel.Item key={index} index={index}>
              <DecorativeBox w="100%" h="300px" rounded="lg" fontSize="2.5rem">
                {index + 1}
              </DecorativeBox>
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>

        <Carousel.NextTrigger asChild>
          <IconButton size="xs" variant="outline">
            <LuArrowRight />
          </IconButton>
        </Carousel.NextTrigger>
      </Carousel.Control>

      <Carousel.Indicators />
    </Carousel.Root>
  )
}
