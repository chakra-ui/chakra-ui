"use client"

import {
  Button,
  Carousel,
  CloseButton,
  Dialog,
  Image,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react"

const items = [
  {
    src: "https://picsum.photos/seed/step1/500/300",
    title: "Welcome to Chakra UI",
    description:
      "Start building your design system effortlessly with Chakra UI.",
  },
  {
    src: "https://picsum.photos/seed/step2/500/300",
    title: "Customize Components Easily",
    description:
      "Modify components using props, themes, and responsive utilities.",
  },
  {
    src: "https://picsum.photos/seed/step3/500/300",
    title: "Build Responsive UIs",
    description: "Design layouts that adapt to all screen sizes seamlessly.",
  },
]

export const CarouselWithDialog = () => {
  return (
    <Dialog.Root size={{ mdDown: "full", md: "lg" }}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Discover Chakra UI
        </Button>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>&nbsp;</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body>
              <Carousel.Root
                slideCount={items.length}
                maxW="full"
                loop={false}
                autoplay={false}
              >
                <Carousel.ItemGroup>
                  {items.map((item, index) => (
                    <Carousel.Item key={index} index={index}>
                      <VStack w="full" gap={4}>
                        <Image
                          src={item.src}
                          alt={item.title}
                          w="100%"
                          h="300px"
                          objectFit="cover"
                          borderRadius="md"
                        />

                        <VStack w="full" align="start" gap={1} px={2}>
                          <Text fontWeight="bold" fontSize="lg">
                            {item.title}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            {item.description}
                          </Text>
                        </VStack>
                      </VStack>
                    </Carousel.Item>
                  ))}
                </Carousel.ItemGroup>

                <VStack gap={4} mt={6}>
                  <Carousel.Indicators count={items.length} />
                </VStack>

                <Carousel.Context>
                  {(carousel) => {
                    const currentIndex = carousel.page
                    const isFirst = currentIndex === 0
                    const isLast = currentIndex === items.length - 1

                    return (
                      <Dialog.Footer justifyContent="space-between" px={0}>
                        {isFirst ? (
                          <Dialog.ActionTrigger asChild>
                            <Button variant="outline">Not now</Button>
                          </Dialog.ActionTrigger>
                        ) : (
                          <Carousel.PrevTrigger asChild>
                            <Button variant="outline">Previous</Button>
                          </Carousel.PrevTrigger>
                        )}

                        {isLast ? (
                          <Dialog.ActionTrigger asChild>
                            <Button colorScheme="blue">Check it out</Button>
                          </Dialog.ActionTrigger>
                        ) : (
                          <Carousel.NextTrigger asChild>
                            <Button colorScheme="blue">Next</Button>
                          </Carousel.NextTrigger>
                        )}
                      </Dialog.Footer>
                    )
                  }}
                </Carousel.Context>
              </Carousel.Root>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default CarouselWithDialog
