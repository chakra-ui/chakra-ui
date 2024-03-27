import {
  SystemStyleObject,
  ThemingProps,
  omitThemingProps,
} from "@chakra-ui/styled-system"
import {
  HTMLChakraProps,
  chakra,
  forwardRef,
  useMultiStyleConfig,
} from "../system"
import { cx } from "@chakra-ui/utils/cx"
import { useMemo } from "react"
import { UseTabsProps, useTabs } from "./use-tabs"
import { useMergeRefs } from "@chakra-ui/hooks/use-merge-refs"
import { TabsProvider, TabsStylesProvider } from "./tabs-context"

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
  extends UseTabsProps,
    ThemingProps<"Tabs">,
    Omit<HTMLChakraProps<"div">, "onChange" | "defaultValue">,
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
    const styles = useMultiStyleConfig("Tabs", props)
    const { children, className, ...rest } = omitThemingProps(props)

    const ctx = useTabs(rest)
    const context = useMemo(() => ctx, [ctx])

    const tabsStyles: SystemStyleObject = {
      position: "relative",
      ...styles.root,
    }

    return (
      <TabsProvider value={context}>
        <TabsStylesProvider value={styles}>
          <chakra.div
            className={cx("chakra-tabs", className)}
            ref={useMergeRefs(ref, context.rootRef)}
            {...rest}
            __css={tabsStyles}
          >
            {children}
          </chakra.div>
        </TabsStylesProvider>
      </TabsProvider>
    )
  },
)

TabsRoot.displayName = "TabsRoot"
