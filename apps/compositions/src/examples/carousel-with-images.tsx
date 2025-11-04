import { AspectRatio, Box, Carousel, IconButton, Image } from "@chakra-ui/react"
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"

export const CarouselWithImages = () => {
  return (
    <Carousel.Root
      slideCount={items.length}
      maxW="5xl"
      mx="auto"
      gap="4"
      position="relative"
    >
      <Carousel.Control gap="4" width="full" position="relative">
        <Carousel.PrevTrigger asChild color="colorPalette.contrast">
          <IconButton
            size="xs"
            variant="outline"
            bg="colorPalette.inverted"
            rounded="full"
            position="absolute"
            zIndex="1"
            ml="4"
          >
            <LuArrowLeft />
          </IconButton>
        </Carousel.PrevTrigger>
        <Carousel.ItemGroup width="full">
          {items.map((src, index) => (
            <Carousel.Item key={index} index={index}>
              <AspectRatio ratio={16 / 9} maxH="72vh" w="full">
                <Image
                  src={src}
                  alt={`Product ${index + 1}`}
                  objectFit="contain"
                />
              </AspectRatio>
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>
        <Carousel.NextTrigger asChild color="colorPalette.contrast">
          <IconButton
            size="xs"
            variant="outline"
            rounded="full"
            bg="colorPalette.inverted"
            position="absolute"
            zIndex="1"
            mr="4"
            right="0"
          >
            <LuArrowRight />
          </IconButton>
        </Carousel.NextTrigger>
        <Box position="absolute" bottom="4" width="full">
          <Carousel.Indicators _current={{ width: "10" }} />
        </Box>
      </Carousel.Control>
    </Carousel.Root>
  )
}

const items = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
  "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
]
