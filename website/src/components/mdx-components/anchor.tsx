import { chakra } from '@chakra-ui/react'
import * as React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Anchor = React.forwardRef((props: any, ref: any) => (
  <chakra.a ref={ref} apply='mdx.a' {...props} />
))
