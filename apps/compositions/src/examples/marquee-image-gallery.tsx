"use client"

import { Box, HStack, Image, Marquee } from "@chakra-ui/react"

export const MarqueeImageGallery = () => (
  <Box height="500px" overflow="hidden" perspective="500px">
    <HStack
      gap="4"
      height="700px"
      transform="rotateX(20deg)"
      transformOrigin="center top"
    >
      <Marquee.Root side="top" flex="1" autoFill>
        <Marquee.Viewport>
          <Marquee.Content>
            <MarqueeItems images={imagesColumn1} />
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>

      <Marquee.Root side="bottom" flex="1" autoFill>
        <Marquee.Viewport>
          <Marquee.Content>
            <MarqueeItems images={imagesColumn2} />
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>

      <Marquee.Root side="top" flex="1" autoFill>
        <Marquee.Viewport>
          <Marquee.Content>
            <MarqueeItems images={imagesColumn3} />
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    </HStack>
  </Box>
)

const MarqueeItems = (props: { images: string[] }) => {
  return (
    <>
      {props.images.map((src, i) => (
        <Marquee.Item key={i} py="2">
          <Image
            src={src}
            alt={`Gallery image ${i + 1}`}
            width="full"
            height="200px"
            objectFit="cover"
            rounded="lg"
            shadow="md"
          />
        </Marquee.Item>
      ))}
    </>
  )
}

const imagesColumn1 = [
  "https://picsum.photos/seed/img1/280/200",
  "https://picsum.photos/seed/img2/280/200",
  "https://picsum.photos/seed/img3/280/200",
  "https://picsum.photos/seed/img4/280/200",
]

const imagesColumn2 = [
  "https://picsum.photos/seed/img5/280/200",
  "https://picsum.photos/seed/img6/280/200",
  "https://picsum.photos/seed/img7/280/200",
  "https://picsum.photos/seed/img8/280/200",
]

const imagesColumn3 = [
  "https://picsum.photos/seed/img9/280/200",
  "https://picsum.photos/seed/img10/280/200",
  "https://picsum.photos/seed/img11/280/200",
  "https://picsum.photos/seed/img12/280/200",
]
