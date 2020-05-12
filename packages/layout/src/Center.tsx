import { chakra, PropsOf } from "@chakra-ui/system"
import { __DEV__, cx } from "@chakra-ui/utils"
import * as React from "react"

export type CenterProps = PropsOf<typeof chakra.div>

/**
 * React component used to horizontally and vertically center its child.
 * It uses the popular `display: flex` centering technique.
 *
 * @see Docs https://chakra-ui.com/center
 */
export const Center = React.forwardRef(
  (props: CenterProps, ref: React.Ref<any>) => {
    const { children, className, ...rest } = props

    // enforce a single child
    const child = React.Children.only(children)

    const _className = cx("chakra-center", className)

    return (
      <chakra.div
        ref={ref}
        display="flex"
        alignItems="center"
        justifyContent="center"
        className={_className}
        {...rest}
      >
        {child}
      </chakra.div>
    )
  },
)

if (__DEV__) {
  Center.displayName = "Center"
}
