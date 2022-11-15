import { callAll, cx } from "@chakra-ui/shared-utils"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  keyframes,
} from "@chakra-ui/system"

import { useMemo } from "react"
import { useMenuStyles } from "./menu"
import { useMenuContext, useMenuList, useMenuPositioner } from "./use-menu"

export interface MenuListProps extends HTMLChakraProps<"div"> {
  /**
   * Props for the root element that positions the menu.
   */
  rootProps?: HTMLChakraProps<"div">
}

const enterAnim = keyframes({
  from: {
    opacity: 0,
    transform: "scale(0.8)",
    visibility: "hidden",
  },
  to: {
    opacity: 1,
    transform: "scale(1)",
    visibility: "visible",
  },
})

const exitAnim = keyframes({
  from: {
    opacity: 1,
    transform: "scale(1)",
    visibility: "visible",
  },
  to: {
    opacity: 0,
    transform: "scale(0.8)",
    visibility: "hidden",
  },
})

export const MenuList = forwardRef<MenuListProps, "div">(function MenuList(
  props,
  ref,
) {
  const { rootProps, ...rest } = props
  const { isOpen, hasBeenOpened, onTransitionEnd } = useMenuContext()

  const listProps = useMenuList(rest, ref) as any
  const positionerProps = useMenuPositioner(rootProps)

  const styles = useMenuStyles()

  const animation = useMemo(() => {
    if (!hasBeenOpened.current) {
      return undefined
    }

    return isOpen
      ? `${enterAnim} 200ms cubic-bezier(0.4, 0, 0.2, 1.0)`
      : `${exitAnim} 100ms ease-out`
  }, [isOpen, hasBeenOpened])

  return (
    <chakra.div
      {...positionerProps}
      __css={{
        zIndex: props.zIndex ?? styles.list?.zIndex,
      }}
    >
      <chakra.div
        __css={{
          outline: 0,
          visibility: isOpen ? "visible" : "hidden",
          animation: animation,
          ...styles.list,
        }}
        style={{
          ...listProps.style,
        }}
        className={cx("chakra-menu__menu-list", listProps.className)}
        {...listProps}
        onAnimationEnd={callAll(onTransitionEnd, listProps.onAnimationComplete)}
      />
    </chakra.div>
  )
})

MenuList.displayName = "MenuList"
