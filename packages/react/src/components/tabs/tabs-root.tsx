import { useMergeRefs } from "@chakra-ui/hooks/use-merge-refs"
import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  defineStyle,
  forwardRef,
  useSlotRecipe,
} from "../../styled-system"
import { splitTabsProps } from "./tab-props"
import { TabsProvider, TabsStylesProvider } from "./tabs-context"
import { UseTabsProps, useTabs } from "./use-tabs"

interface TabsRootOptions {
  /**
   * If `true`, tabs will stretch to width of the tablist.
   * @default false
   */
  isFitted?: boolean
  /**
   * The alignment of the tabs
   */
  align?: "start" | "end" | "center"
}

export interface TabsRootProps
  extends HTMLChakraProps<"div", UseTabsProps>,
    SystemRecipeProps<"Tabs">,
    TabsRootOptions {
  children: React.ReactNode
}

/**
 * Tabs
 *
 * Provides context and logic for all tabs components.
 *
 * @see Docs https://chakra-ui.com/docs/components/tabs
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/
 */
export const TabsRoot = forwardRef<TabsRootProps, "div">(
  function TabsRoot(props, ref) {
    const recipe = useSlotRecipe("Tabs")

    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    const [useTabsProps, elementProps] = splitTabsProps(localProps)
    const api = useTabs(useTabsProps)

    const tabsStyles = defineStyle({
      position: "relative",
      ...styles.root,
    })

    return (
      <TabsProvider value={api}>
        <TabsStylesProvider value={styles}>
          <chakra.div
            className={cx("chakra-tabs", props.className)}
            ref={useMergeRefs(ref, api.rootRef)}
            {...elementProps}
            css={[tabsStyles, props.css]}
          />
        </TabsStylesProvider>
      </TabsProvider>
    )
  },
)

TabsRoot.displayName = "TabsRoot"
