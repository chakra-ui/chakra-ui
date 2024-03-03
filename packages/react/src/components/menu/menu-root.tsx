import { MaybeRenderProp, runIfFn } from "@chakra-ui/utils"
import { SystemRecipeProps, useSlotRecipe } from "../../styled-system"
import { MenuProvider, MenuStylesProvider } from "./menu-context"
import { UseMenuProps, useMenu } from "./use-menu"

export interface MenuRootProps extends UseMenuProps, SystemRecipeProps<"Menu"> {
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
  const recipe = useSlotRecipe("Menu")

  const [variantProps, localProps] = recipe.splitVariantProps(props)
  const styles = recipe(variantProps)

  // const { direction } = useTheme()
  // const ctx = useMenu({ ...ownProps, direction })

  const context = useMenu(localProps)

  const { isOpen, onClose, forceUpdate } = context

  return (
    <MenuProvider value={context}>
      <MenuStylesProvider value={styles}>
        {runIfFn(props.children, { isOpen, onClose, forceUpdate })}
      </MenuStylesProvider>
    </MenuProvider>
  )
}

MenuRoot.displayName = "Menu"
