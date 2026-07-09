"use client"

import {
  Box,
  Circle,
  HStack,
  Image,
  Marquee,
  Span,
  Stack,
} from "@chakra-ui/react"

const mono = "var(--font-geist-mono)"

const reduceMotion = {
  "@media (prefers-reduced-motion: reduce)": {
    "& [data-part='content']": { animationPlayState: "paused" },
  },
}

interface BrowserFrameProps {
  url: string
  w?: Record<string, string> | string
  children: React.ReactNode
}

/** Browser-window chrome (traffic lights + url bar) wrapping any body content. */
function BrowserFrame(props: BrowserFrameProps) {
  const { url, w, children } = props
  return (
    <Box
      w={w}
      borderWidth="1px"
      borderColor="border"
      rounded="l2"
      overflow="hidden"
      bg="bg.panel"
      shadow="xs"
    >
      <HStack
        px="3.5"
        py="2.5"
        gap="2"
        borderBottomWidth="1px"
        borderColor="border"
        bg="bg.subtle"
      >
        <HStack gap="1.5">
          <Circle size="2.5" bg="bg.emphasized" />
          <Circle size="2.5" bg="bg.emphasized" />
          <Circle size="2.5" bg="bg.emphasized" />
        </HStack>
        <Box
          flex="1"
          ms="2"
          h="5"
          rounded="full"
          bg="bg.muted"
          maxW="60%"
          display="flex"
          alignItems="center"
          px="3"
        >
          <Span fontFamily={mono} fontSize="2xs" color="fg.subtle" truncate>
            {url.replace(/^https?:\/\//, "")}
          </Span>
        </Box>
      </HStack>
      {children}
    </Box>
  )
}

interface MockWindowProps {
  seed: number
  url: string
  w?: Record<string, string> | string
  bodyH?: Record<string, string> | string
}

/** One stylized app-window placeholder. Used until real screenshots are added. */
function MockWindow(props: MockWindowProps) {
  const {
    seed,
    url,
    w = { base: "300px", md: "420px" },
    bodyH = { base: "180px", md: "240px" },
  } = props
  const variant = seed % 3

  return (
    <BrowserFrame url={url} w={w}>
      <Box h={bodyH} p="4">
        {variant === 0 && (
          <HStack h="full" align="stretch" gap="4">
            <Stack w="28%" bg="bg.subtle" rounded="md" p="2.5" gap="2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Box key={i} h="2.5" rounded="full" bg="bg.muted" />
              ))}
            </Stack>
            <Stack flex="1" gap="3">
              <HStack gap="3">
                <Box flex="1" h="14" rounded="md" bg="bg.muted" />
                <Box flex="1" h="14" rounded="md" bg="teal.subtle" />
              </HStack>
              <Box
                flex="1"
                rounded="md"
                borderWidth="1px"
                borderColor="border"
              />
            </Stack>
          </HStack>
        )}
        {variant === 1 && (
          <Stack h="full" gap="2.5">
            <Box h="6" w="40%" rounded="md" bg="teal.subtle" />
            {[80, 95, 60, 88, 50, 72].map((width, i) => (
              <Box key={i} h="3" w={`${width}%`} rounded="full" bg="bg.muted" />
            ))}
          </Stack>
        )}
        {variant === 2 && (
          <Box position="relative" h="full">
            <Circle
              size="12"
              bg="bg.subtle"
              borderWidth="1px"
              borderColor="teal.emphasized"
              position="absolute"
              top="2"
              left="6"
            />
            <Circle
              size="10"
              bg="bg.subtle"
              borderWidth="1px"
              borderColor="border"
              position="absolute"
              bottom="3"
              left="0"
            />
            <Circle
              size="14"
              bg="teal.subtle"
              borderWidth="1px"
              borderColor="teal.emphasized"
              position="absolute"
              top="10"
              right="8"
            />
            <Box
              position="absolute"
              top="7"
              left="16"
              w="24"
              h="0.5"
              bg="border.emphasized"
            />
          </Box>
        )}
      </Box>
    </BrowserFrame>
  )
}

/** A single full-width preview for a story card: real screenshot or a mock. */
export function StoryPreview(props: {
  images?: string[]
  url: string
  seed: number
}) {
  const { images, url, seed } = props
  const image = images?.[0]

  if (image) {
    return (
      <BrowserFrame url={url} w="full">
        <Image
          src={image}
          alt=""
          display="block"
          width="full"
          h={{ base: "220px", md: "320px" }}
          objectFit="cover"
        />
      </BrowserFrame>
    )
  }

  return (
    <MockWindow
      seed={seed}
      url={url}
      w="full"
      bodyH={{ base: "220px", md: "320px" }}
    />
  )
}

export interface GalleryItem {
  src: string
  url: string
  alt?: string
}

/**
 * Full-bleed marquee gallery. Each item carries its own url so the frame shows
 * the right address per screenshot. Pass `items` for mixed sources (e.g. the
 * showcase), or `images` + a single `url` for one product. Falls back to mocks.
 */
export function ProductGallery(props: {
  items?: GalleryItem[]
  images?: string[]
  url?: string
}) {
  const { items, images, url } = props
  const resolved: GalleryItem[] =
    items ?? (images && url ? images.map((src) => ({ src, url })) : [])
  const hasImages = resolved.length > 0

  return (
    <Marquee.Root autoFill speed={44} css={reduceMotion}>
      <Marquee.Viewport py="2">
        <Marquee.Content>
          {hasImages
            ? resolved.map((item, index) => (
                <Marquee.Item key={index} px="3">
                  <Box asChild cursor="pointer">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BrowserFrame url={item.url}>
                        <Image
                          src={item.src}
                          alt={item.alt ?? ""}
                          display="block"
                          h={{ base: "180px", md: "240px" }}
                          w="auto"
                          objectFit="cover"
                        />
                      </BrowserFrame>
                    </a>
                  </Box>
                </Marquee.Item>
              ))
            : [0, 1, 2, 3, 4].map((index) => (
                <Marquee.Item key={index} px="3">
                  <MockWindow
                    seed={index}
                    url={url ?? "https://chakra-ui.com"}
                  />
                </Marquee.Item>
              ))}
        </Marquee.Content>
      </Marquee.Viewport>
    </Marquee.Root>
  )
}
