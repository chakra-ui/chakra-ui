import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react"
import NextImage from "next/image"

interface VideoCardProps {
  image: string
  title: string
  href: string
}

const VideoCard = (props: VideoCardProps) => {
  const { image, title, href } = props
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Flex
        padding="4"
        borderWidth="1px"
        rounded="lg"
        focusRing="outside"
        _hover={{ bg: "bg.subtle" }}
        cursor="pointer"
        align="center"
      >
        <Box maxW="26px" maxH="26px">
          <NextImage
            src={image}
            alt="Migration Guide"
            layout="responsive"
            width="120"
            height="100"
          />
        </Box>
        <Box p="2">
          <Text textStyle="sm">{title}</Text>
        </Box>
      </Flex>
    </a>
  )
}

export const FeaturedVideo = () => {
  return (
    <SimpleGrid
      mb="10"
      columns={{ base: 1, lg: 2 }}
      gap={{ base: "4", md: "8" }}
    >
      <VideoCard
        title="Watch the migration livestream (1)"
        href="https://www.youtube.com/live/eU0n9egYGzU?si=ejMOxn1pgUH_6Ox-"
        image="/image.png"
      />
      <VideoCard
        title="Watch the migration livestream (2)"
        href="https://www.youtube.com/live/Ia9CZS3it4g?si=QfWnChbkHy_qwXJm"
        image="/image.png"
      />
    </SimpleGrid>
  )
}
