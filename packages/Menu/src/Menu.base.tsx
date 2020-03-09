import * as React from "react"
import {
  MenuHookReturn,
  useMenu,
  useMenuDisclosure,
  useMenuList,
  useMenuItem,
  MenuItemHookProps,
} from "./Menu.hook"
import { createContext } from "@chakra-ui/utils"
import { PropsOf } from "@chakra-ui/system"
import { useMergeRefs } from "@chakra-ui/hooks"

const [MenuProvider, useMenuContext] = createContext<MenuHookReturn>({
  strict: false,
})

export function Menu({ children }: any) {
  const context = useMenuContext()
  const menuContext = useMenu({ context })
  return <MenuProvider value={menuContext}>{children}</MenuProvider>
}

export const BaseMenuButton = React.forwardRef(
  (
    props: PropsOf<"button"> & { as?: React.ElementType },
    ref: React.Ref<any>,
  ) => {
    const { as: Comp = "button", ...htmlProps } = props
    const context = useMenuContext()
    const buttonProps = useMenuDisclosure({ context, ...htmlProps })
    const ownRef = useMergeRefs(ref, buttonProps.ref)

    return <Comp {...buttonProps} ref={ownRef} />
  },
)

export const BaseMenuList = React.forwardRef(
  (props: PropsOf<"div">, ref: React.Ref<any>) => {
    const context = useMenuContext()
    const listProps = useMenuList({ context, ...props })
    const ownRef = useMergeRefs(listProps.ref, ref)

    return <div {...listProps} ref={ownRef} />
  },
)

type BaseMenuItemProps = PropsOf<"div"> & { as?: React.ElementType } & {
  isDisabled?: boolean
  isFocusable?: boolean
}

export const BaseMenuItem = React.forwardRef(
  (props: BaseMenuItemProps, ref: React.Ref<any>) => {
    const { as: Comp = "div", ...htmlProps } = props
    const context = useMenuContext()
    const itemProps = useMenuItem({ context, ...htmlProps })
    const ownRef = useMergeRefs(itemProps.ref, ref)

    return <Comp {...itemProps} ref={ownRef} />
  },
)
