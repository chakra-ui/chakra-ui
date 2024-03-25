import { AspectRatio, Box, LinkBox, LinkOverlay, Stack } from '@chakra-ui/react'
import Image from 'next/image'

export function FigmaPluginAd({ medium }: { medium: string }) {
  return (
    <LinkBox>
      <Stack
        bg='teal.50'
        borderWidth='1px'
        rounded='lg'
        padding='4'
        position='relative'
        _dark={{ bg: 'teal.800' }}
      >
        <AspectRatio ratio={2} rounded='xl' overflow='hidden'>
          <Image
            priority
            src='/figma/ad.png'
            style={{ objectFit: 'contain' }}
            fill
            sizes='100%'
            alt='figma plugin'
          />
        </AspectRatio>
        <Box fontWeight='medium' px='2'>
          <LinkOverlay href={getUrl(medium)}>
            Convert Figma Designs to Chakra UI code
          </LinkOverlay>
        </Box>
      </Stack>
    </LinkBox>
  )
}

function getUrl(medium: string) {
  return `https://figma.chakra-ui.com?utm_source=chakra-ui.com&utm_medium=${medium}`
}
