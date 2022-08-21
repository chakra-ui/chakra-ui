import { createContext, MaybeRenderProp } from "@chakra-ui/react-utils"
import {
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
  useTheme,
} from "@chakra-ui/system"
import { Dict, runIfFn, __DEV__ } from "@chakra-ui/utils"
import { useMemo } from "react"
import {
  MenuDescendantsProvider,
  MenuProvider,
  useMenu,
  UseMenuProps,
} from "./use-menu"

const [MenuStylesProvider, useMenuStyles] = createContext<
  Dict<SystemStyleObject>
>({
  name: `MenuStylesContext`,
  errorMessage: `useMenuStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Menu />" `,
})

export { useMenuStyles }

export interface MenuProps extends UseMenuProps, ThemingProps<"Menu"> {
  children: MaybeRenderProp<{
    isOpen: boolean
    onClose: () => void
    forceUpdate: (() => void) | undefined
  }>
}

/**
 * Menu provides context, state, and focus management
 * to its sub-components. It doesn't render any DOM node.
 */
export const Menu: React.FC<MenuProps> = (props) => {
  const { children } = props

  const styles = useMultiStyleConfig("Menu", props)
  const ownProps = omitThemingProps(props)
  const { direction } = useTheme()
  const { descendants, ...ctx } = useMenu({ ...ownProps, direction })
  const context = useMemo(() => ctx, [ctx])

  const { isOpen, onClose, forceUpdate } = context

  return (
    <MenuDescendantsProvider value={descendants}>
      <MenuProvider value={context}>
        <MenuStylesProvider value={styles}>
          {runIfFn(children, { isOpen, onClose, forceUpdate })}
        </MenuStylesProvider>
      </MenuProvider>
    </MenuDescendantsProvider>
  )
}

if (__DEV__) {
  Menu.displayName = "Menu"
}
