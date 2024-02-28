import { runIfFn } from "@chakra-ui/utils/run-if-fn"
import { useMemo } from "react"
import { ThemingProps, omitThemingProps } from "../styled-system"
import { useMultiStyleConfig, useTheme } from "../system"
import { MenuProvider, MenuStylesProvider } from "./menu-context"
import { UseMenuProps, useMenu } from "./use-menu"

type MaybeRenderProp<P> = React.ReactNode | ((props: P) => React.ReactNode)

export interface MenuRootProps extends UseMenuProps, ThemingProps<"Menu"> {
  children: MaybeRenderProp<{
    isOpen: boolean
    onClose: () => void
    forceUpdate: (() => void) | undefined
  }>
}

/**
 * Menu provides context, state, and focus management
 * to its sub-components. It doesn't render any DOM node.
 *
 * @see Docs https://chakra-ui.com/docs/components/menu
 */
export const MenuRoot: React.FC<MenuRootProps> = (props) => {
  const { children } = props

  const styles = useMultiStyleConfig("Menu", props)
  const ownProps = omitThemingProps(props)
  const { direction } = useTheme()
  const ctx = useMenu({ ...ownProps, direction })
  const context = useMemo(() => ctx, [ctx])

  const { isOpen, onClose, forceUpdate } = context

  return (
    <MenuProvider value={context}>
      <MenuStylesProvider value={styles}>
        {runIfFn(children, { isOpen, onClose, forceUpdate })}
      </MenuStylesProvider>
    </MenuProvider>
  )
}

MenuRoot.displayName = "Menu"
