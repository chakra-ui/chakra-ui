import * as React from "react"
import { chakra } from "@chakra-ui/react"

export const Anchor = React.forwardRef((props: any, ref: any) => (
  <chakra.a ref={ref} apply="mdx.a" {...props} />
))
