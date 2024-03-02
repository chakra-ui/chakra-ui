import {
  Box,
  Flex,
  SystemStyleObject,
  chakra,
  useTheme,
} from '@chakra-ui/react'
import NextImage from 'next/image'
import * as React from 'react'
import loadScript from 'utils/load-script'

export function CarbonAd() {
  const ref = React.useRef(null)

  const theme = useTheme()

  const carbonAd: SystemStyleObject = {
    display: 'block',
    position: 'relative',
    margin: '32px 0',
    maxWidth: '480px',
    minHeight: '132px',
    borderRadius: '4px',
    bg: 'gray.50',
    _dark: {
      bg: 'rgba(36, 70, 93, 0.32)',
    },
    color: 'inherit',
    '@media (max-width: 480px)': {
      fontSize: '0.875em',
    },
    a: {
      textDecoration: 'none',
      color: 'inherit',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '.carbon-wrap': {
      display: 'flex',
      padding: '16px',
    },
    '.carbon-img': {
      marginRight: '16px',
      img: {
        display: 'block',
      },
    },
    '.carbon-text': {
      fontSize: '0.8rem',
      lineHeight: 1.4,
    },
    '.carbon-poweredby': {
      position: 'absolute',
      bottom: '16px',
      left: '162px',
      color: `${theme.colors.gray[500]} !important`,
      display: 'block',
      fontSize: '10px',
      fontWeight: 'semibold',
      textTransform: 'uppercase',
      lineHeight: 1,
      letterSpacing: '0.2px',
    },
  }

  React.useEffect(() => {
    const scriptEl = document.getElementById('_carbonads_js')

    if (!ref.current || !!scriptEl) return

    const script = loadScript(
      'https://cdn.carbonads.com/carbon.js?serve=CE7DKK7L&placement=chakra-uicom',
      ref.current,
    )
    script.id = '_carbonads_js'
  }, [])

  return <chakra.span id='carbon-ad' ref={ref} css={carbonAd} />
}

const DocsPageChakraProAd = () => (
  <Flex
    as='a'
    p='4'
    bg='gray.50'
    _dark={{ bg: 'rgba(36, 70, 93, 0.32)' }}
    href='https://pro.chakra-ui.com/components?utm_source=chakra-ui.com&utm_medium=docs-ad'
    rel='noopener sponsored'
    target='_blank'
    maxW='xl'
    my='8'
    rounded='md'
  >
    <Box w='xs' h='100px' bg='gray.300' mr='4'>
      <NextImage
        alt='chakra ui pro'
        src='/chakra-pro-ad.png'
        layout='fixed'
        width='150'
        height='100'
      />
    </Box>
    <Flex direction='column'>
      <Box flex='1' fontSize='sm'>
        <b>Chakra UI Pro:</b> Start your application or marketing site with a
        growing collection of beautiful and responsive UI components.
      </Box>
      <Box fontWeight='medium' fontSize='xs' opacity={0.7}>
        Ads via Chakra UI
      </Box>
    </Flex>
  </Flex>
)

export default DocsPageChakraProAd
