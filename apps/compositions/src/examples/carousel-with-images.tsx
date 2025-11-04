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
      colorPalette="white"
    >
      <Carousel.Control gap="4" width="full" position="relative">
        <Carousel.PrevTrigger asChild color="colorPalette.contrast">
          <IconButton
            size="xs"
            variant="outline"
            rounded="full"
            position="absolute"
            zIndex="1"
            ml="4"
            bg="colorPalette.solid"
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
            position="absolute"
            zIndex="1"
            mr="4"
            right="0"
            bg="colorPalette.solid"
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
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1064",
  "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=60&w=900",
  "https://images.unsplash.com/photo-1662037131482-8fb5d10aab9a?q=60&w=900",
  "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&q=80",
  "https://images.unsplash.com/photo-1747691875590-14db938e42d4?q=60&w=900",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
]
