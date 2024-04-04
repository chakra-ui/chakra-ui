import { chakra } from '@chakra-ui/react'

export const PageHeading = chakra('h2', {
  base: {
    fontFamily: 'heading',
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: '-0.015em',
  },
  variants: {
    size: {
      sm: {
        fontSize: { base: '1.75rem', md: '2.75rem' },
      },
      md: {
        fontSize: { base: '2rem', md: '3.5rem' },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
