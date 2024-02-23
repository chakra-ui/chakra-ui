import { ThemingProps, omitThemingProps } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils/cx"
import {
  HTMLChakraProps,
  chakra,
  forwardRef,
  useMultiStyleConfig,
} from "../system"
import { splitTabsProps } from "./tab-props"
import {
  TabsContextProvider,
  TabsDescendantsProvider,
  TabsStylesProvider,
} from "./tabs-context"
import { UseTabsProps, useTabs } from "./use-tabs"

interface TabsOptions {
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
  extends UseTabsProps,
    ThemingProps<"Tabs">,
    Omit<HTMLChakraProps<"div">, "onChange">,
    TabsOptions {
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
    const styles = useMultiStyleConfig("Tabs", props)
    const { children, className, ...rest } = omitThemingProps(props)

    const [useTabsProps, rootProps] = splitTabsProps(rest)
    const { descendants, ...context } = useTabs(useTabsProps)

    return (
      <TabsDescendantsProvider value={descendants}>
        <TabsContextProvider value={context}>
          <TabsStylesProvider value={styles}>
            <chakra.div
              className={cx("chakra-tabs", className)}
              ref={ref}
              {...rootProps}
              __css={styles.root}
            >
              {children}
            </chakra.div>
          </TabsStylesProvider>
        </TabsContextProvider>
      </TabsDescendantsProvider>
    )
  },
)

TabsRoot.displayName = "TabsRoot"
