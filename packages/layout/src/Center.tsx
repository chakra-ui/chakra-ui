import { chakra, PropsOf } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { forwardRef, Children, Ref } from "react"

export type CenterProps = PropsOf<typeof chakra.div>

/**
 * React component used to horizontally and vertically center its child.
 * It uses the popular `display: flex` centering technique.
 *
 * @see Docs https://chakra-ui.com/center
 */
export const Center = forwardRef((props: CenterProps, ref: Ref<any>) => {
  const { children, ...rest } = props

  // enforce a single child
  const child = Children.only(children)

  return (
    <chakra.div
      ref={ref}
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...rest}
    >
      {child}
    </chakra.div>
  )
})

if (__DEV__) {
  Center.displayName = "Center"
}
