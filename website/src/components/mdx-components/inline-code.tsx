import { useSize } from '@chakra-ui/hooks'
import { Code, HTMLChakraProps } from '@chakra-ui/react'
import { useRef } from 'react'

export const InlineCode = (props: HTMLChakraProps<'code'>) => {
  const codeRef = useRef(null)
  const dimensions = useSize(codeRef)

  const MIN_CONTENT_WIDTH = 363
  const shouldWrap = dimensions?.width > MIN_CONTENT_WIDTH

  return (
    <Code
      variant='plain'
      colorPalette='purple'
      fontSize='0.9em'
      ref={codeRef}
      whiteSpace={shouldWrap ? undefined : 'nowrap'}
      {...props}
    />
  )
}
