import { getValidChildren } from "@chakra-ui/react-children-utils"
import { cx } from "@chakra-ui/shared-utils"
import { HTMLChakraProps, forwardRef } from "@chakra-ui/system"
import { chakra } from "@chakra-ui/system"
import { useMemo, cloneElement, Fragment } from "react"

export type ZStackOptions = {
  /**
   * If set the stack will start from the given index
   *
   * @default 0
   */
  startIndex?: number
}
export interface ZStackProps extends HTMLChakraProps<"div">, ZStackOptions {}

export const ZStack = forwardRef<ZStackProps, "div">((props, ref) => {
  const { children, startIndex, className, ...rest } = props

  const clones = useMemo(() => {
    const validChildren = getValidChildren(children)
    return validChildren.map((child, index) => {
      const key = typeof child.key !== "undefined" ? child.key : index
      const clonedChild = cloneElement(child as React.ReactElement<any>, {
        position: "absolute",
        zIndex: startIndex ? startIndex + index : index,
      })
      return <Fragment key={key}>{clonedChild}</Fragment>
    })
  }, [children, startIndex])

  const _className = cx("chakra-stack", className)

  return (
    <chakra.div
      ref={ref}
      __css={{
        position: "relative",
      }}
      className={_className}
      {...rest}
    >
      {clones}
    </chakra.div>
  )
})

ZStack.displayName = "ZStack"
