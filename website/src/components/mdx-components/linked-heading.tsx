import { chakra } from '@chakra-ui/react'
import React from 'react'

const MdxHeading = chakra('h2', {
  base: {
    scrollMarginBlock: '6.875rem',
    '& a': {
      marginStart: '0.375rem',
      color: 'teal.500',
      fontWeight: 'normal',
      outline: 'none',
      _focus: { opacity: 1, boxShadow: 'outline' },
      opacity: 0,
      _groupHover: { opacity: 1 },
    },
  },
  variants: {
    size: {
      h1: {
        mt: '2rem',
        mb: '.25rem',
        lineHeight: 1.2,
        fontWeight: 'bold',
        fontSize: '1.875rem',
        letterSpacing: '-.025em',
      },
      h2: {
        mt: '4rem',
        mb: '0.5rem',
        lineHeight: 1.3,
        fontWeight: 'semibold',
        fontSize: '1.5rem',
        letterSpacing: '-.025em',
        '& + h3': {
          mt: '1.5rem',
        },
      },
      h3: {
        mt: '3rem',
        lineHeight: 1.25,
        fontWeight: 'semibold',
        fontSize: '1.25rem',
        letterSpacing: '-.025em',
      },
      h4: {
        mt: '3rem',
        lineHeight: 1.375,
        fontWeight: 'semibold',
        fontSize: '1.125rem',
      },
    },
  },
})

export const LinkedHeading = (
  props: React.ComponentProps<typeof MdxHeading>,
) => (
  <MdxHeading data-group='' {...props}>
    <span className='content'>{props.children}</span>
    {props.id && (
      <a aria-label='anchor' href={`#${props.id}`}>
        #
      </a>
    )}
  </MdxHeading>
)
