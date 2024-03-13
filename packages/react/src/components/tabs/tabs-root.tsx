import { useMergeRefs } from "@chakra-ui/hooks"
import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  HTMLChakraProps,
  SlotRecipeProps,
  chakra,
  useSlotRecipe,
} from "../../styled-system"
import { splitTabsProps } from "./tab-props"
import { TabsProvider, TabsStylesProvider } from "./tabs-context"
import { UseTabsProps, useTabs } from "./use-tabs"

export interface TabsRootProps
  extends HTMLChakraProps<"div", UseTabsProps>,
    SlotRecipeProps<"Tabs"> {
  /**
   * If `true`, the tabs will be unstyled.
   */
  unstyled?: boolean
}

/**
 * Tabs
 *
 * Provides context and logic for all tabs components.
 *
 * @see Docs https://chakra-ui.com/docs/components/tabs
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/
 */
export const TabsRoot = forwardRef<HTMLDivElement, TabsRootProps>(
  function TabsRoot(props, ref) {
    const { unstyled, ...restProps } = props

    const recipe = useSlotRecipe("Tabs", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(restProps)
    const styles = recipe(variantProps)

    const [useTabsProps, elementProps] = splitTabsProps(localProps)
    const api = useTabs(useTabsProps)

    return (
      <TabsProvider value={api}>
        <TabsStylesProvider value={styles}>
          <chakra.div
            ref={useMergeRefs(ref, api.rootRef)}
            {...elementProps}
            className={cx("chakra-tabs", props.className)}
            css={[styles.root, props.css]}
          />
        </TabsStylesProvider>
      </TabsProvider>
    )
  },
)

TabsRoot.displayName = "TabsRoot"
