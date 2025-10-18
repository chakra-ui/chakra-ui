"use client"

import { Box, Carousel, HStack, VStack } from "@chakra-ui/react"
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"

const items = [
  { width: "20%", label: "Small", color: "bg.subtle" },
  { width: "30%", label: "Medium", color: "bg.muted" },
  { width: "50%", label: "Large", color: "bg.subtle" },
  { width: "20%", label: "Small", color: "bg.muted" },
  { width: "30%", label: "Medium", color: "bg.subtle" },
  { width: "50%", label: "Large", color: "bg.muted" },
]

export const CarouselWithVariableWidth = () => {
  const slidesPerPage = 3
  const slidesPerMove = 3
  const totalPages = Math.ceil(items.length / slidesPerMove)

  return (
    <VStack align="stretch" py={8} w="full" gap={6}>
      <Box maxW="900px" mx="auto" w="full" px={4}>
        <Carousel.Root
          slideCount={items.length}
          slidesPerPage={slidesPerPage}
          slidesPerMove={slidesPerMove}
          spacing="20px"
        >
          <Carousel.ItemGroup
            display="grid"
            gridAutoFlow="column"
            gridAutoColumns="auto"
          >
            {items.map((item, index) => (
              <Carousel.Item key={index} index={index} asChild>
                <Box
                  w="full"
                  maxW={item.width}
                  minW="full"
                  h="200px"
                  borderRadius="md"
                  bg={item.color}
                  color="fg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderWidth="1px"
                  borderColor="border"
                  fontWeight="medium"
                >
                  {item.label}
                </Box>
              </Carousel.Item>
            ))}
          </Carousel.ItemGroup>

          <Carousel.Navs
            leftIcon={<LuArrowLeft />}
            rightIcon={<LuArrowRight />}
          />

          <HStack justify="center" mt={6}>
            <Carousel.Indicators count={totalPages} />
          </HStack>
        </Carousel.Root>
      </Box>
    </VStack>
  )
}

export default CarouselWithVariableWidth
