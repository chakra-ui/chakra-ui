import { useSize } from '@chakra-ui/hooks'
import { chakra, HTMLChakraProps } from '@chakra-ui/react'
import { useRef } from 'react'

const StyledCode = chakra('code', {
  base: {
    rounded: 'sm',
    px: '1',
    fontSize: '0.875em',
    py: '2px',
    lineHeight: 'normal',
    color: { base: 'purple.500', _dark: 'purple.200' },
  },
  variants: {
    wrap: {
      false: {
        whiteSpace: 'nowrap',
      },
    },
  },
})

export const InlineCode = (props: HTMLChakraProps<'code'>) => {
  const codeRef = useRef(null)
  const dimensions = useSize(codeRef)

  const MIN_CONTENT_WIDTH = 363
  const shouldWrap = dimensions?.width > MIN_CONTENT_WIDTH

  return <StyledCode ref={codeRef} wrap={shouldWrap} {...props} />
}
