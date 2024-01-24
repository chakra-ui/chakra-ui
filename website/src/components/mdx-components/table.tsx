import { chakra } from '@chakra-ui/react'
import * as React from 'react'

export const Table = (props) => (
  <chakra.div overflowX='auto'>
    <chakra.table textAlign='left' mt='32px' width='full' {...props} />
  </chakra.div>
)

export const THead = (props) => (
  <chakra.th
    bg='gray.50'
    _dark={{ bg: 'whiteAlpha.100' }}
    fontWeight='semibold'
    p={2}
    fontSize='sm'
    {...props}
  />
)

export const TData = (props) => (
  <chakra.td
    p={2}
    borderTopWidth='1px'
    borderColor='inherit'
    fontSize='sm'
    whiteSpace='normal'
    {...props}
  />
)
