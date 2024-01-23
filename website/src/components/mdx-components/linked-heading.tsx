import { HTMLChakraProps, chakra } from '@chakra-ui/react'
import React from 'react'

export const LinkedHeading = (props: HTMLChakraProps<'h2'>) => (
  <chakra.h2 data-group='' css={{ scrollMarginBlock: '6.875rem' }} {...props}>
    <span className='content'>{props.children}</span>
    {props.id && (
      <chakra.a
        aria-label='anchor'
        color='teal.500'
        fontWeight='normal'
        outline='none'
        _focus={{ opacity: 1, boxShadow: 'outline' }}
        opacity={0}
        _groupHover={{ opacity: 1 }}
        ml='0.375rem'
        href={`#${props.id}`}
      >
        #
      </chakra.a>
    )}
  </chakra.h2>
)
