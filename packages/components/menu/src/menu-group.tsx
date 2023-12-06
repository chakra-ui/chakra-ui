import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import { useVirtualizer } from "@tanstack/react-virtual"

import { useMenuStyles } from "./menu"
import React, { useRef } from "react"

export interface MenuGroupProps extends HTMLChakraProps<"div"> {
  virtualized?: boolean
  virtualizedOptions?: {
    rowHeight: number
    containerHeight: number
  }
}

export const MenuGroup = forwardRef<MenuGroupProps, "div">((props, ref) => {
  const { title, children, className, ...rest } = props
  const arrayChildren = React.Children.toArray(children)

  const virtualizedRef = useRef(null)
  const _className = cx("chakra-menu__group__title", className)
  const styles = useMenuStyles()

  const rowVirtualizer = useVirtualizer({
    count: arrayChildren.length,
    getScrollElement: () => virtualizedRef.current,
    estimateSize: () => props.virtualizedOptions?.rowHeight ?? 35,
  })

  return (
    <div ref={ref} className="chakra-menu__group" role="group">
      {title && (
        <chakra.p className={_className} {...rest} __css={styles.groupTitle}>
          {title}
        </chakra.p>
      )}
      {props.virtualized ? (
        <chakra.div
          ref={virtualizedRef}
          height={props.virtualizedOptions?.containerHeight ?? 400}
          overflow="auto"
        >
          <chakra.div
            height={rowVirtualizer.getTotalSize()}
            width="100%"
            position="relative"
          >
            {rowVirtualizer.getVirtualItems().map((virtualItem) => (
              <chakra.div
                key={virtualItem.key}
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height={`${virtualItem.size}px`}
                transform={`translateY(${virtualItem.start}px)`}
              >
                {arrayChildren[virtualItem.index]}
              </chakra.div>
            ))}
          </chakra.div>
        </chakra.div>
      ) : (
        children
      )}
    </div>
  )
})

MenuGroup.displayName = "MenuGroup"
